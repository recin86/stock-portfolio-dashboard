import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import type { Account } from '../types';

const AccountDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock data - 나중에 API로 교체
  const mockAccount: Account = {
    id: id || '1',
    name: '본인 계좌',
    brokerName: '키움증권',
    accountNumber: '1234-5678',
    totalBalance: 50000000,
    cashBalance: 5000000,
    stockValue: 45000000,
    totalProfitLoss: 2500000,
    totalProfitLossPercent: 5.26,
    stocks: [
      {
        symbol: '005930',
        name: '삼성전자',
        quantity: 100,
        currentPrice: 75000,
        averagePrice: 70000,
        totalValue: 7500000,
        profitLoss: 500000,
        profitLossPercent: 7.14
      },
      {
        symbol: '000660',
        name: 'SK하이닉스',
        quantity: 50,
        currentPrice: 120000,
        averagePrice: 115000,
        totalValue: 6000000,
        profitLoss: 250000,
        profitLossPercent: 4.35
      },
      {
        symbol: '035420',
        name: 'NAVER',
        quantity: 30,
        currentPrice: 180000,
        averagePrice: 190000,
        totalValue: 5400000,
        profitLoss: -300000,
        profitLossPercent: -5.26
      },
      {
        symbol: '005380',
        name: '현대차',
        quantity: 80,
        currentPrice: 200000,
        averagePrice: 185000,
        totalValue: 16000000,
        profitLoss: 1200000,
        profitLossPercent: 8.11
      },
      {
        symbol: '051910',
        name: 'LG화학',
        quantity: 25,
        currentPrice: 440000,
        averagePrice: 420000,
        totalValue: 11000000,
        profitLoss: 500000,
        profitLossPercent: 4.76
      }
    ],
    lastUpdated: new Date()
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercent = (percent: number): string => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="container py-4">
      {/* 헤더 */}
      <header className="d-flex align-items-center mb-4">
        <button onClick={handleBack} className="btn glass-hover p-2 mr-3">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-grow-1">
          <h1 className="mb-1">{mockAccount.name}</h1>
          <p className="text-muted mb-0">
            {mockAccount.brokerName} • {mockAccount.accountNumber}
          </p>
        </div>
      </header>

      {/* 계좌 요약 */}
      <div className="glass p-4 mb-4">
        <div className="d-flex align-items-center mb-3">
          <DollarSign size={24} className="mr-2" />
          <h2>계좌 요약</h2>
        </div>
        
        <div className="d-grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <div>
            <p className="text-muted mb-1">총 자산</p>
            <h3 className="fw-bold">{formatCurrency(mockAccount.totalBalance)}</h3>
          </div>
          
          <div>
            <p className="text-muted mb-1">현금</p>
            <h3 className="fw-bold text-secondary">{formatCurrency(mockAccount.cashBalance)}</h3>
          </div>

          <div>
            <p className="text-muted mb-1">주식 평가액</p>
            <h3 className="fw-bold text-secondary">{formatCurrency(mockAccount.stockValue)}</h3>
          </div>
          
          <div>
            <p className="text-muted mb-1">총 손익</p>
            <div className="d-flex align-items-center gap-1">
              {mockAccount.totalProfitLoss >= 0 ? (
                <TrendingUp size={20} className="text-success" />
              ) : (
                <TrendingDown size={20} className="text-danger" />
              )}
              <h3 className={`fw-bold ${mockAccount.totalProfitLoss >= 0 ? 'text-success' : 'text-danger'}`}>
                {formatCurrency(Math.abs(mockAccount.totalProfitLoss))}
              </h3>
            </div>
            <p className={`text-secondary mb-0 ${mockAccount.totalProfitLossPercent >= 0 ? 'text-success' : 'text-danger'}`}>
              {formatPercent(mockAccount.totalProfitLossPercent)}
            </p>
          </div>
        </div>
      </div>

      {/* 보유 종목 */}
      <div className="glass p-4">
        <div className="d-flex align-items-center mb-4">
          <BarChart3 size={24} className="mr-2" />
          <h2>보유 종목</h2>
          <span className="ml-auto text-muted">{mockAccount.stocks.length}개 종목</span>
        </div>

        <div className="d-grid gap-3">
          {mockAccount.stocks.map((stock, index) => (
            <div key={index} className="glass p-3">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h4 className="fw-semibold mb-1">{stock.name}</h4>
                  <p className="text-muted mb-0">{stock.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="fw-bold mb-0">{formatCurrency(stock.totalValue)}</p>
                  <div className="d-flex align-items-center gap-1 justify-content-end">
                    {stock.profitLoss >= 0 ? (
                      <TrendingUp size={14} className="text-success" />
                    ) : (
                      <TrendingDown size={14} className="text-danger" />
                    )}
                    <span className={`text-sm ${stock.profitLoss >= 0 ? 'text-success' : 'text-danger'}`}>
                      {formatCurrency(Math.abs(stock.profitLoss))}
                    </span>
                  </div>
                </div>
              </div>

              <div className="d-grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))' }}>
                <div>
                  <p className="text-muted mb-1" style={{ fontSize: '0.875rem' }}>수량</p>
                  <p className="mb-0 fw-medium">{stock.quantity.toLocaleString()}주</p>
                </div>
                <div>
                  <p className="text-muted mb-1" style={{ fontSize: '0.875rem' }}>현재가</p>
                  <p className="mb-0 fw-medium">{formatCurrency(stock.currentPrice)}</p>
                </div>
                <div>
                  <p className="text-muted mb-1" style={{ fontSize: '0.875rem' }}>평균단가</p>
                  <p className="mb-0 fw-medium">{formatCurrency(stock.averagePrice)}</p>
                </div>
                <div>
                  <p className="text-muted mb-1" style={{ fontSize: '0.875rem' }}>수익률</p>
                  <p className={`mb-0 fw-medium ${stock.profitLossPercent >= 0 ? 'text-success' : 'text-danger'}`}>
                    {formatPercent(stock.profitLossPercent)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-muted">
          마지막 업데이트: {mockAccount.lastUpdated.toLocaleString('ko-KR')}
        </p>
      </div>
    </div>
  );
};

export default AccountDetail;