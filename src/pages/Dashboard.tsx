import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import type { Account, PortfolioSummary } from '../types';
import DonutChart from '../components/DonutChart';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Mock data - 나중에 API로 교체
  const mockAccounts: Account[] = [
    {
      id: '1',
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
          quantity: 200,
          currentPrice: 75000,
          averagePrice: 70000,
          totalValue: 15000000,
          profitLoss: 1000000,
          profitLossPercent: 7.14
        },
        {
          symbol: '000660',
          name: 'SK하이닉스',
          quantity: 80,
          currentPrice: 120000,
          averagePrice: 115000,
          totalValue: 9600000,
          profitLoss: 400000,
          profitLossPercent: 4.35
        },
        {
          symbol: '035420',
          name: 'NAVER',
          quantity: 50,
          currentPrice: 180000,
          averagePrice: 190000,
          totalValue: 9000000,
          profitLoss: -500000,
          profitLossPercent: -5.26
        },
        {
          symbol: '005380',
          name: '현대차',
          quantity: 60,
          currentPrice: 200000,
          averagePrice: 185000,
          totalValue: 12000000,
          profitLoss: 900000,
          profitLossPercent: 8.11
        }
      ],
      lastUpdated: new Date()
    },
    {
      id: '2',
      name: '배우자 계좌',
      brokerName: '메리츠증권',
      accountNumber: '9876-5432',
      totalBalance: 30000000,
      cashBalance: 3000000,
      stockValue: 27000000,
      totalProfitLoss: -1200000,
      totalProfitLossPercent: -3.85,
      stocks: [
        {
          symbol: '051910',
          name: 'LG화학',
          quantity: 25,
          currentPrice: 440000,
          averagePrice: 420000,
          totalValue: 11000000,
          profitLoss: 500000,
          profitLossPercent: 4.76
        },
        {
          symbol: '006400',
          name: '삼성SDI',
          quantity: 30,
          currentPrice: 380000,
          averagePrice: 400000,
          totalValue: 11400000,
          profitLoss: -600000,
          profitLossPercent: -5.0
        },
        {
          symbol: '207940',
          name: '삼성바이오로직스',
          quantity: 5,
          currentPrice: 820000,
          averagePrice: 850000,
          totalValue: 4100000,
          profitLoss: -150000,
          profitLossPercent: -3.53
        }
      ],
      lastUpdated: new Date()
    },
    {
      id: '3',
      name: '본인 ISA',
      brokerName: '키움증권',
      accountNumber: '1111-2222',
      totalBalance: 15000000,
      cashBalance: 1500000,
      stockValue: 13500000,
      totalProfitLoss: 800000,
      totalProfitLossPercent: 5.63,
      stocks: [
        {
          symbol: '373220',
          name: 'LG에너지솔루션',
          quantity: 20,
          currentPrice: 350000,
          averagePrice: 320000,
          totalValue: 7000000,
          profitLoss: 600000,
          profitLossPercent: 9.38
        },
        {
          symbol: '096770',
          name: 'SK이노베이션',
          quantity: 40,
          currentPrice: 130000,
          averagePrice: 125000,
          totalValue: 5200000,
          profitLoss: 200000,
          profitLossPercent: 4.0
        },
        {
          symbol: '018260',
          name: '삼성에스디에스',
          quantity: 10,
          currentPrice: 130000,
          averagePrice: 135000,
          totalValue: 1300000,
          profitLoss: -50000,
          profitLossPercent: -3.7
        }
      ],
      lastUpdated: new Date()
    },
    {
      id: '4',
      name: '배우자 ISA',
      brokerName: '메리츠증권',
      accountNumber: '3333-4444',
      totalBalance: 12000000,
      cashBalance: 1200000,
      stockValue: 10800000,
      totalProfitLoss: 600000,
      totalProfitLossPercent: 5.26,
      stocks: [
        {
          symbol: '068270',
          name: '셀트리온',
          quantity: 30,
          currentPrice: 180000,
          averagePrice: 170000,
          totalValue: 5400000,
          profitLoss: 300000,
          profitLossPercent: 5.88
        },
        {
          symbol: '028260',
          name: '삼성물산',
          quantity: 40,
          currentPrice: 110000,
          averagePrice: 105000,
          totalValue: 4400000,
          profitLoss: 200000,
          profitLossPercent: 4.76
        },
        {
          symbol: '009150',
          name: '삼성전기',
          quantity: 8,
          currentPrice: 125000,
          averagePrice: 130000,
          totalValue: 1000000,
          profitLoss: -40000,
          profitLossPercent: -3.85
        }
      ],
      lastUpdated: new Date()
    }
  ];

  const portfolioSummary: PortfolioSummary = {
    totalBalance: mockAccounts.reduce((sum, acc) => sum + acc.totalBalance, 0),
    totalProfitLoss: mockAccounts.reduce((sum, acc) => sum + acc.totalProfitLoss, 0),
    totalProfitLossPercent: 0,
    accounts: mockAccounts,
    topPerformingStocks: [],
    lastUpdated: new Date()
  };

  portfolioSummary.totalProfitLossPercent = 
    ((portfolioSummary.totalProfitLoss / (portfolioSummary.totalBalance - portfolioSummary.totalProfitLoss)) * 100);

  const formatCurrency = (amount: number): string => {
    return '₩ ' + new Intl.NumberFormat('ko-KR', {
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercent = (percent: number): string => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  const handleAccountClick = (accountId: string) => {
    navigate(`/account/${accountId}`);
  };

  // 전체 종목별 비중 계산 (Top 5)
  const stocksByValue = useMemo(() => {
    const stockMap = new Map<string, { name: string; totalValue: number }>();
    
    mockAccounts.forEach(account => {
      account.stocks.forEach(stock => {
        const existing = stockMap.get(stock.symbol);
        if (existing) {
          existing.totalValue += stock.totalValue;
        } else {
          stockMap.set(stock.symbol, {
            name: stock.name,
            totalValue: stock.totalValue
          });
        }
      });
    });

    return Array.from(stockMap.values())
      .sort((a, b) => b.totalValue - a.totalValue)
      .slice(0, 5);
  }, [mockAccounts]);

  // 계좌별 자산 분포
  const accountDistribution = useMemo(() => {
    return mockAccounts.map(account => ({
      name: account.name,
      value: account.totalBalance
    }));
  }, [mockAccounts]);

  // 차트 데이터 생성
  const stockChartData = {
    labels: stocksByValue.map(stock => stock.name),
    datasets: [{
      data: stocksByValue.map(stock => stock.totalValue),
      backgroundColor: [
        '#3182f6',
        '#e53e3e', 
        '#ff8c00',
        '#2563eb',
        '#8b95a1'
      ],
      borderColor: [
        '#3182f6',
        '#e53e3e',
        '#ff8c00', 
        '#2563eb',
        '#8b95a1'
      ],
      borderWidth: 2
    }]
  };

  const accountChartData = {
    labels: accountDistribution.map(acc => acc.name),
    datasets: [{
      data: accountDistribution.map(acc => acc.value),
      backgroundColor: [
        '#3182f6',
        '#e53e3e',
        '#ff8c00',
        '#2563eb'
      ],
      borderColor: [
        '#3182f6', 
        '#e53e3e',
        '#ff8c00',
        '#2563eb'
      ],
      borderWidth: 2
    }]
  };

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="text-center mb-2">포트폴리오 대시보드</h1>
        <p className="text-center text-muted">
          마지막 업데이트: {portfolioSummary.lastUpdated.toLocaleString('ko-KR')}
        </p>
      </header>

      {/* 통합 요약 카드 */}
      <div className="glass p-4 mb-4">
        <div className="d-flex align-items-center mb-4">
          <PieChart size={24} className="mr-2" />
          <h2>전체 포트폴리오</h2>
        </div>
        
        {/* 기본 정보 */}
        <div className="d-grid mb-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div>
            <p className="text-muted mb-1">총 자산</p>
            <h3 className="fw-bold">{formatCurrency(portfolioSummary.totalBalance)}</h3>
          </div>
          
          <div>
            <p className="text-muted mb-1">총 손익</p>
            <div className="d-flex align-items-center gap-1">
              {portfolioSummary.totalProfitLoss >= 0 ? (
                <TrendingUp size={20} className="text-success" />
              ) : (
                <TrendingDown size={20} className="text-danger" />
              )}
              <h3 className={`fw-bold ${portfolioSummary.totalProfitLoss >= 0 ? 'text-success' : 'text-danger'}`}>
                {formatCurrency(Math.abs(portfolioSummary.totalProfitLoss))}
              </h3>
            </div>
          </div>
          
          <div>
            <p className="text-muted mb-1">수익률</p>
            <h3 className={`fw-bold ${portfolioSummary.totalProfitLossPercent >= 0 ? 'text-success' : 'text-danger'}`}>
              {formatPercent(portfolioSummary.totalProfitLossPercent)}
            </h3>
          </div>
          
          <div>
            <p className="text-muted mb-1">계좌 수</p>
            <h3 className="fw-bold">{portfolioSummary.accounts.length}개</h3>
          </div>
        </div>

        {/* 차트 섹션 */}
        <div className="d-grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div className="glass p-3">
            <DonutChart 
              data={stockChartData} 
              title="보유 종목 비중 (Top 5)"
            />
          </div>
          
          <div className="glass p-3">
            <DonutChart 
              data={accountChartData} 
              title="계좌별 자산 분포"
            />
          </div>
        </div>
      </div>

      {/* 개별 계좌 카드들 */}
      <div className="d-grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
        {mockAccounts.map((account) => (
          <div
            key={account.id}
            className="glass glass-hover p-4"
            onClick={() => handleAccountClick(account.id)}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="fw-semibold mb-0">{account.name}</h3>
              <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>{account.brokerName} • ****-{account.accountNumber.slice(-4)}</p>
            </div>

            <div className="mb-3">
              <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '2px' }}>총 자산</p>
              <h2 className="fw-bold mb-1">{formatCurrency(account.totalBalance)}</h2>
              
              <div className="d-flex align-items-center gap-1 mb-3">
                {account.totalProfitLoss >= 0 ? (
                  <TrendingUp size={16} className="text-success" />
                ) : (
                  <TrendingDown size={16} className="text-danger" />
                )}
                <span className={`fw-medium ${account.totalProfitLoss >= 0 ? 'text-success' : 'text-danger'}`}>
                  {formatCurrency(Math.abs(account.totalProfitLoss))} 
                  ({formatPercent(account.totalProfitLossPercent)})
                </span>
              </div>

              <div className="mb-3">
                <div className="mb-1">
                  <span className="text-muted">현금 </span>
                  <span className="fw-medium">{formatCurrency(account.cashBalance)}</span>
                </div>
                <div>
                  <span className="text-muted">주식 </span>
                  <span className="fw-medium">{formatCurrency(account.stockValue)}</span>
                </div>
              </div>
            </div>

            {account.stocks.length > 0 && (
              <div className="pt-3" style={{ borderTop: '1px solid #f2f4f6' }}>
                <p className="text-muted mb-2">주요 보유종목 (비중순)</p>
                <div className="d-grid gap-1">
                  {account.stocks
                    .sort((a, b) => b.totalValue - a.totalValue)
                    .slice(0, 3)
                    .map((stock, index) => {
                      const percentage = ((stock.totalValue / account.stockValue) * 100).toFixed(1);
                      return (
                        <div key={index} className="d-flex justify-content-between align-items-center">
                          <div className="d-flex flex-column">
                            <span className="fw-medium" style={{ fontSize: '0.875rem' }}>{stock.name}</span>
                            <span className="text-muted" style={{ fontSize: '0.75rem' }}>{percentage}%</span>
                          </div>
                          <span className={`fw-medium ${stock.profitLoss >= 0 ? 'text-success' : 'text-danger'}`} style={{ fontSize: '0.875rem' }}>
                            {formatPercent(stock.profitLossPercent)}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;