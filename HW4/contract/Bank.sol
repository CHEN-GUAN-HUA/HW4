pragma solidity ^0.4.23;

contract Bank 
{
	// 此合約的擁有者
    address private owner;

	// 儲存所有會員的餘額
    mapping (address => uint256) private balance;

	// 用於通知前端 web3.js的事件
    event DepositEvent(address indexed from, uint256 value, uint256 timestamp);
    event WithdrawEvent(address indexed from, uint256 value, uint256 timestamp);
    event TransferEvent(address indexed from, address indexed to, uint256 value, uint256 timestamp);

    modifier isOwner() 
    {
        require(owner == msg.sender, "you are not owner");
        _;
    }

	// 建構子
    constructor() public payable 
    {
        owner = msg.sender;
    }

	// 存錢
    function deposit() public payable 
    {
        balance[msg.sender] += msg.value;
        emit DepositEvent(msg.sender, msg.value, now);
    }

	// 提錢
    function withdraw(uint256 etherValue) public 
    {
        uint256 weiValue = etherValue * 1 ether;
        require(balance[msg.sender] >= weiValue, "your balances are not enough");
        msg.sender.transfer(weiValue);
        balance[msg.sender] -= weiValue;
        emit WithdrawEvent(msg.sender, etherValue, now);
    }

	// 轉帳
    function transfer(address to, uint256 etherValue) public 
    {
        uint256 weiValue = etherValue * 1 ether;
        require(balance[msg.sender] >= weiValue, "your balances are not enough");
        balance[msg.sender] -= weiValue;
        balance[to] += weiValue;
        emit TransferEvent(msg.sender, to, etherValue, now);
    }

	// 檢查銀行帳戶餘額
    function getBankBalance() public view returns (uint256) 
    {
        return balance[msg.sender];
    }

    // 定存 ---------------------------------------------------------------------------------------
    struct package
    {
        uint256 amount;
        uint256 count;
    }

    mapping (address => package) private buy;

    // 用於通知前端 web3.js的事件
    event BuyTimeDepositEvent(address indexed from, uint256 value, uint256 count, uint256 timestamp);
    event TimeDepositExpiredEvent(address indexed from, uint256 value, uint256 count, uint256 timestamp);

    // 購買定存
    function BuyTimeDeposit(uint256 count) public payable
    {
        buy[msg.sender].amount = msg.value;
        buy[msg.sender].count = count;
        emit BuyTimeDepositEvent(msg.sender, msg.value, count, now);
    }

    // 合約結束
    function TimeDepositExpired(uint256 count) public 
    {
        uint256 weiValue = buy[msg.sender].amount * 1 ether;
        if(count > buy[msg.sender].count)
        {
            count = buy[msg.sender].count;
        }
        weiValue = weiValue + (weiValue * (count / buy[msg.sender].count) / 10);
        balance[msg.sender] += weiValue;
        buy[msg.sender].amount = 0;
        buy[msg.sender].count = 0;
        emit TimeDepositExpiredEvent(msg.sender, weiValue, count, now);
    }

    function kill() public isOwner 
    {
        selfdestruct(owner);
    }
}