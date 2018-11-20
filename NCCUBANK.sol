pragma solidity ^0.4.23;

contract Bank {
	// 此合約的擁有者
    address private owner;

	// 儲存所有會員的餘額
    mapping (address => uint256) private balance;

	// 事件們，用於通知前端 web3.js
    event DepositEvent(address indexed from, uint256 value, uint256 timestamp);
    event WithdrawEvent(address indexed from, uint256 value, uint256 timestamp);
    event TransferEvent(address indexed from, address indexed to, uint256 value, uint256 timestamp);

    modifier isOwner() {
        require(owner == msg.sender, "you are not owner");
        _;
    }
    
	// 建構子
    constructor() public payable {
        owner = msg.sender;
    }

	// 存錢
    function deposit() public payable {
        balance[msg.sender] += msg.value;

        emit DepositEvent(msg.sender, msg.value, now);
    }

	// 提錢
    function withdraw(uint256 etherValue) public {
        uint256 weiValue = etherValue * 1 ether;

        require(balance[msg.sender] >= weiValue, "your balances are not enough");

        msg.sender.transfer(weiValue);

        balance[msg.sender] -= weiValue;

        emit WithdrawEvent(msg.sender, etherValue, now);
    }

	// 轉帳
    function transfer(address to, uint256 etherValue) public {
        uint256 weiValue = etherValue * 1 ether;

        require(balance[msg.sender] >= weiValue, "your balances are not enough");

        balance[msg.sender] -= weiValue;
        balance[to] += weiValue;

        emit TransferEvent(msg.sender, to, etherValue, now);
    }

	// 檢查銀行帳戶餘額
    function getBankBalance() public view returns (uint256) {
        return balance[msg.sender];
    }
    
    
    // ------------------------------------------------------------
    // -------------------------從此處開始-------------------------
    // ------------------------------------------------------------
    
    // 建構一個package把兩個變數包進裡面
    struct package
    {
        uint256 amount;
        uint256 count;
    }
    
    // 知道address就能夠知道金額跟期數
    mapping(address => package) private buy;
    
    // 一個為購買定存的事件、一個為到期的事件，通知前端web.js
    event BuyTimeDepositEvent(address indexed from, uint256 value, uint256 count, uint256 timestamp);
    event TimeDepositExpiredEvent(address indexed from, uint256 value, uint256 count, uint256 timestamp);
    
    // 購買定存，輸入約定之期數
    function BuyTimeDeposit(uint256 count) public payable
    {
    // 將兩個數值輸入，前者是購買定存的金額，後者是約定之期數
        buy[msg.sender].amount = msg.value;
        buy[msg.sender].count = count;
        
    // 要檢查是否有足夠的存款轉定存
        require(balance[msg.sender] >= buy[msg.sender].amount);
        
    // 因為把錢轉入定存，所以要從餘額裡扣款
        balance[msg.sender] -= buy[msg.sender].amount;
        
    // 發出購買定存的事件
        emit BuyTimeDepositEvent(msg.sender, msg.value, count, now);
    }
    
    // 合約結束結束之時，可能等於約定之期數也可能小於
    function TimeDepositExpired(uint256 count) public payable
    {
    // 不讓count超過約定的期數，最多就等於約定之期數
        if(count > buy[msg.sender].count)
        {
            count = buy[msg.sender].count;
        }
        
    // 利息與本金之計算，前者為ㄌ本金後者為利息
        uint256 totalValue = buy[msg.sender].amount + buy[msg.sender].amount * count / 100;
        
    // 將到期的定存加入原本的餘額中
        balance[msg.sender] += totalValue;
        
    // 因為定存已結束，將原本存入的變數歸零
        buy[msg.sender].amount = 0;
        buy[msg.sender].count = 0;
        
    // 發出定存到期之的事件
        emit TimeDepositExpiredEvent(msg.sender, totalValue, count, now);
    }

    // 允許合約部屬人可以自毀合約
    function kill() public isOwner {
        selfdestruct(owner);
    }
}