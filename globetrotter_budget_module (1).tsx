import React, { useState, useEffect, useMemo } from 'react';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { 
  Wallet, Plane, Hotel, Utensils, Activity, ShoppingBag, MoreHorizontal, 
  Plus, Trash2, Edit2, AlertCircle, TrendingDown, TrendingUp, Lightbulb, 
  Map, Calendar, DollarSign, Target, ArrowRightLeft, CheckCircle2
} from 'lucide-react';

const CATEGORIES = [
  { id: 'flights', label: 'Flights', icon: Plane, color: '#3b82f6' }, // Blue
  { id: 'hotels', label: 'Hotels', icon: Hotel, color: '#8b5cf6' },   // Purple
  { id: 'food', label: 'Food', icon: Utensils, color: '#f59e0b' },    // Amber
  { id: 'activities', label: 'Activities', icon: Activity, color: '#10b981' }, // Emerald
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag, color: '#ec4899' }, // Pink
  { id: 'miscellaneous', label: 'Miscellaneous', icon: MoreHorizontal, color: '#64748b' } // Slate
];

const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD'];

const COLORS = {
  primary: 'text-blue-600',
  bgPrimary: 'bg-blue-600',
  bgPale: 'bg-blue-50',
  navy: 'text-slate-900',
  muted: 'text-slate-500',
  border: 'border-slate-200',
  warning: 'text-orange-600',
  bgWarning: 'bg-orange-50',
  danger: 'text-red-600',
  bgDanger: 'bg-red-50',
  success: 'text-emerald-600',
  bgSuccess: 'bg-emerald-50'
};

const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount || 0);
};

const calculateDays = (start, end) => {
  if (!start || !end) return 0;
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return diffDays > 0 ? diffDays : 1; // Minimum 1 day to avoid Infinity
};

const Card = ({ children, className = '', title, icon: Icon, action }) => (
  <div className={`bg-white rounded-xl shadow-sm border ${COLORS.border} overflow-hidden ${className}`}>
    {(title || Icon) && (
      <div className={`px-5 py-4 border-b ${COLORS.border} flex justify-between items-center bg-slate-50/50`}>
        <div className="flex items-center gap-2">
          {Icon && <Icon className={`w-5 h-5 ${COLORS.primary}`} />}
          <h3 className={`font-semibold ${COLORS.navy}`}>{title}</h3>
        </div>
        {action && <div>{action}</div>}
      </div>
    )}
    <div className="p-5">{children}</div>
  </div>
);

const ProgressBar = ({ current, max, colorClass = 'bg-blue-500', heightClass = 'h-2' }) => {
  const percentage = max > 0 ? Math.min(100, Math.max(0, (current / max) * 100)) : 0;
  return (
    <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${heightClass}`}>
      <div 
        className={`${heightClass} rounded-full transition-all duration-500 ${colorClass}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default function GlobeTrotterBudget() {
  // State Initialization (with LocalStorage fallback)
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('gt_budget_config');
    return saved ? JSON.parse(saved) : {
      destination: 'Paris, France',
      startDate: '2026-09-01',
      endDate: '2026-09-07',
      totalBudget: 3500,
      currency: 'USD'
    };
  });

  const [allocations, setAllocations] = useState(() => {
    const saved = localStorage.getItem('gt_budget_allocations');
    return saved ? JSON.parse(saved) : {
      flights: 800, hotels: 1200, food: 600, activities: 400, shopping: 300, miscellaneous: 200
    };
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('gt_budget_expenses');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Eiffel Tower Tickets', amount: 55, category: 'activities', date: '2026-09-02', note: 'Sunset view' },
      { id: '2', name: 'Dinner at Le Jules Verne', amount: 250, category: 'food', date: '2026-09-02', note: 'Anniversary' }
    ];
  });

  const [savingsGoal, setSavingsGoal] = useState(() => {
    const saved = localStorage.getItem('gt_budget_savings');
    return saved ? JSON.parse(saved) : { target: 3500, saved: 2100 };
  });

  // Effects for Persistence
  useEffect(() => { localStorage.setItem('gt_budget_config', JSON.stringify(config)); }, [config]);
  useEffect(() => { localStorage.setItem('gt_budget_allocations', JSON.stringify(allocations)); }, [allocations]);
  useEffect(() => { localStorage.setItem('gt_budget_expenses', JSON.stringify(expenses)); }, [expenses]);
  useEffect(() => { localStorage.setItem('gt_budget_savings', JSON.stringify(savingsGoal)); }, [savingsGoal]);

  const totalAllocated = useMemo(() => Object.values(allocations).reduce((a, b) => a + (Number(b) || 0), 0), [allocations]);
  const unallocated = Math.max(0, config.totalBudget - totalAllocated);
  
  const totalSpent = useMemo(() => expenses.reduce((a, e) => a + (Number(e.amount) || 0), 0), [expenses]);
  const remainingBudget = config.totalBudget - totalSpent;
  const budgetPercentage = config.totalBudget > 0 ? (totalSpent / config.totalBudget) * 100 : 0;
  
  const tripDays = calculateDays(config.startDate, config.endDate);
  const dailyLimit = config.totalBudget / tripDays;
  const dailyActual = totalSpent / tripDays;

  const spentByCategory = useMemo(() => {
    const totals = {};
    CATEGORIES.forEach(c => totals[c.id] = 0);
    expenses.forEach(e => {
      if (totals[e.category] !== undefined) totals[e.category] += Number(e.amount);
    });
    return totals;
  }, [expenses]);

  const alerts = useMemo(() => {
    const newAlerts = [];
    if (budgetPercentage >= 100) {
      newAlerts.push({ type: 'danger', message: 'You have exceeded your total budget limit.' });
    } else if (budgetPercentage >= 80) {
      newAlerts.push({ type: 'warning', message: 'You are approaching your total budget limit.' });
    }

    if (totalAllocated > config.totalBudget) {
      newAlerts.push({ type: 'danger', message: 'Total category allocations exceed your set total budget.' });
    }

    CATEGORIES.forEach(cat => {
      const allocated = allocations[cat.id] || 0;
      const spent = spentByCategory[cat.id] || 0;
      if (allocated > 0 && spent > allocated) {
        newAlerts.push({ type: 'warning', message: `${cat.label} budget exceeded by ${formatCurrency(spent - allocated, config.currency)}.` });
      }
    });
    return newAlerts;
  }, [budgetPercentage, totalAllocated, config, allocations, spentByCategory]);

  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [expenseForm, setExpenseForm] = useState({ name: '', amount: '', category: 'food', date: new Date().toISOString().split('T')[0], note: '' });

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    if (!expenseForm.name || !expenseForm.amount) return;

    if (editingExpense) {
      setExpenses(expenses.map(ex => ex.id === editingExpense.id ? { ...expenseForm, id: ex.id, amount: Number(expenseForm.amount) } : ex));
    } else {
      setExpenses([...expenses, { ...expenseForm, id: Date.now().toString(), amount: Number(expenseForm.amount) }]);
    }
    setIsExpenseFormOpen(false);
    setEditingExpense(null);
    setExpenseForm({ name: '', amount: '', category: 'food', date: new Date().toISOString().split('T')[0], note: '' });
  };

  const openEditExpense = (expense) => {
    setEditingExpense(expense);
    setExpenseForm(expense);
    setIsExpenseFormOpen(true);
  };

  const deleteExpense = (id) => setExpenses(expenses.filter(e => e.id !== id));

  const pieChartData = CATEGORIES.map(cat => ({
    name: cat.label,
    value: spentByCategory[cat.id] || 0,
    color: cat.color
  })).filter(d => d.value > 0);

  const barChartData = CATEGORIES.map(cat => ({
    name: cat.label,
    Planned: allocations[cat.id] || 0,
    Actual: spentByCategory[cat.id] || 0
  }));

  const recommendations = useMemo(() => {
    const recs = [];
    if (spentByCategory['food'] > (allocations['food'] || 0)) {
      recs.push({ icon: Lightbulb, text: 'Food budget exceeded. Consider grocery shopping or budget-friendly street food for remaining days.' });
    }
    if (budgetPercentage > 85) {
      recs.push({ icon: TrendingDown, text: 'Overall budget is running low. Review planned activities and look for free alternatives.' });
    }
    const unusedCat = Object.keys(allocations).find(k => allocations[k] > 0 && spentByCategory[k] === 0);
    if (unusedCat && tripDays > 3) {
      const label = CATEGORIES.find(c=>c.id === unusedCat)?.label;
      recs.push({ icon: ArrowRightLeft, text: `You haven't spent anything on ${label} yet. Consider reallocating those funds if not needed.` });
    }
    if (recs.length === 0) recs.push({ icon: CheckCircle2, text: 'You are tracking well against your budget. Keep it up!' });
    return recs;
  }, [spentByCategory, allocations, budgetPercentage, tripDays]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 md:p-8">
      
      {/* Top Header */}
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className={`text-3xl font-bold ${COLORS.navy}`}>Budget Management</h1>
          <p className={COLORS.muted}>Track, plan, and optimize your spending for {config.destination || 'your trip'}.</p>
        </div>
        <button 
          onClick={() => setIsExpenseFormOpen(true)}
          className={`flex items-center gap-2 ${COLORS.bgPrimary} text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm`}
        >
          <Plus className="w-5 h-5" />
          Add Expense
        </button>
      </header>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="mb-6 space-y-2">
          {alerts.map((alert, idx) => (
            <div key={idx} className={`p-4 rounded-lg flex items-start gap-3 border ${alert.type === 'danger' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-orange-50 border-orange-200 text-orange-800'}`}>
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="font-medium text-sm">{alert.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Summary Widget Cards (Reusable components for Dashboard) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-l-4 border-l-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-sm font-medium ${COLORS.muted} mb-1`}>Total Budget</p>
              <h2 className={`text-2xl font-bold ${COLORS.navy}`}>{formatCurrency(config.totalBudget, config.currency)}</h2>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg"><Wallet className="w-5 h-5 text-blue-600" /></div>
          </div>
        </Card>
        
        <Card className="border-l-4 border-l-emerald-500">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className={`text-sm font-medium ${COLORS.muted} mb-1`}>Total Spent</p>
              <h2 className={`text-2xl font-bold ${COLORS.navy}`}>{formatCurrency(totalSpent, config.currency)}</h2>
            </div>
            <div className="p-2 bg-emerald-50 rounded-lg"><TrendingDown className="w-5 h-5 text-emerald-600" /></div>
          </div>
          <ProgressBar current={totalSpent} max={config.totalBudget} colorClass={budgetPercentage > 90 ? 'bg-red-500' : 'bg-emerald-500'} />
          <p className="text-xs text-slate-500 mt-2 text-right">{budgetPercentage.toFixed(1)}% used</p>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-sm font-medium ${COLORS.muted} mb-1`}>Remaining</p>
              <h2 className={`text-2xl font-bold ${remainingBudget < 0 ? COLORS.danger : COLORS.navy}`}>
                {formatCurrency(remainingBudget, config.currency)}
              </h2>
            </div>
            <div className="p-2 bg-amber-50 rounded-lg"><DollarSign className="w-5 h-5 text-amber-600" /></div>
          </div>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
           <div className="flex justify-between items-start mb-1">
            <div>
              <p className={`text-sm font-medium ${COLORS.muted} mb-1`}>Daily Spend Limit</p>
              <h2 className={`text-2xl font-bold ${COLORS.navy}`}>{formatCurrency(dailyLimit, config.currency)}</h2>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg"><Calendar className="w-5 h-5 text-purple-600" /></div>
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-3 border-t border-slate-100 pt-2">
            <span>Actual: {formatCurrency(dailyActual, config.currency)}/day</span>
            <span>{tripDays} days</span>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Setup & Tracking */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Budget Setup & Allocations */}
          <Card title="Budget Configuration" icon={Target}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 pb-6 border-b border-slate-100">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Total Budget</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-400">$</span>
                  <input 
                    type="number" 
                    value={config.totalBudget} 
                    onChange={e => setConfig({...config, totalBudget: Number(e.target.value)})}
                    className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Currency</label>
                <select 
                  value={config.currency} 
                  onChange={e => setConfig({...config, currency: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Start Date</label>
                <input 
                  type="date" 
                  value={config.startDate} 
                  onChange={e => setConfig({...config, startDate: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">End Date</label>
                <input 
                  type="date" 
                  value={config.endDate} 
                  onChange={e => setConfig({...config, endDate: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Category Allocations */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-slate-800">Category Allocations</h4>
                <div className={`text-sm font-medium px-3 py-1 rounded-full ${unallocated < 0 ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                  Unallocated: {formatCurrency(unallocated, config.currency)}
                </div>
              </div>
              <div className="space-y-4">
                {CATEGORIES.map(cat => {
                  const allocated = allocations[cat.id] || 0;
                  const spent = spentByCategory[cat.id] || 0;
                  const percentOfTotal = config.totalBudget ? ((allocated / config.totalBudget) * 100).toFixed(0) : 0;
                  
                  return (
                    <div key={cat.id} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${cat.color}20`, color: cat.color }}>
                        <cat.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-slate-700 truncate">{cat.label}</span>
                          <span className="text-slate-500">{percentOfTotal}%</span>
                        </div>
                        <ProgressBar current={spent} max={allocated} colorClass={`bg-[${cat.color}]`} />
                        <div className="flex justify-between text-xs text-slate-400 mt-1">
                          <span>Spent: {formatCurrency(spent, config.currency)}</span>
                          <span className={spent > allocated ? COLORS.danger : ''}>Limit: {formatCurrency(allocated, config.currency)}</span>
                        </div>
                      </div>
                      <div className="w-24">
                        <input 
                          type="number" 
                          value={allocated} 
                          onChange={e => setAllocations({...allocations, [cat.id]: Number(e.target.value)})}
                          className="w-full px-2 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Expense Tracker List */}
          <Card 
            title="Recent Expenses" 
            icon={Map}
            action={
               <button onClick={() => setIsExpenseFormOpen(true)} className="text-sm text-blue-600 font-medium hover:underline">Add New</button>
            }
          >
            {expenses.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <Wallet className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p>No expenses added yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider">
                      <th className="pb-3 font-medium">Expense</th>
                      <th className="pb-3 font-medium">Category</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium text-right">Amount</th>
                      <th className="pb-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {expenses.sort((a,b) => new Date(b.date) - new Date(a.date)).map(exp => {
                      const cat = CATEGORIES.find(c => c.id === exp.category);
                      return (
                        <tr key={exp.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3">
                            <div className="font-medium text-slate-800">{exp.name}</div>
                            {exp.note && <div className="text-xs text-slate-400 truncate max-w-[200px]">{exp.note}</div>}
                          </td>
                          <td className="py-3">
                            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium" style={{ backgroundColor: `${cat?.color}15`, color: cat?.color }}>
                              {cat?.icon && <cat.icon className="w-3 h-3" />}
                              {cat?.label}
                            </span>
                          </td>
                          <td className="py-3 text-sm text-slate-500">{new Date(exp.date).toLocaleDateString()}</td>
                          <td className="py-3 text-sm font-semibold text-slate-800 text-right">{formatCurrency(exp.amount, config.currency)}</td>
                          <td className="py-3 text-right">
                            <button onClick={() => openEditExpense(exp)} className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"><Edit2 className="w-4 h-4" /></button>
                            <button onClick={() => deleteExpense(exp.id)} className="p-1.5 text-slate-400 hover:text-red-600 transition-colors ml-1"><Trash2 className="w-4 h-4" /></button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
          
          {}
          <Card title="Planned Itinerary Cost (Integration Ready)" icon={Map} className="border-dashed border-2 border-slate-300 bg-slate-50/30">
            <div className="mb-4 text-sm text-slate-500">
              <p>This module is ready to integrate with the main Itinerary Builder. It maps activities to their associated expenses.</p>
            </div>
            
            <div className="space-y-6">
              {/* Day 1 Mockup */}
              <div className="relative pl-4 border-l-2 border-slate-200">
                <div className="absolute -left-[9px] top-0 bg-slate-200 text-slate-700 text-xs font-bold px-2 py-1 rounded">Day 1</div>
                <div className="pt-6 space-y-4">
                  {/* Activity Node */}
                  <div className="flex gap-4 items-center">
                    <div className="flex-1 bg-white border border-slate-200 rounded-lg p-3 text-sm shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-2"><Plane className="w-4 h-4 text-slate-400"/> Arrival at Airport</div>
                    </div>
                    <div className="w-4 h-px bg-slate-300"></div>
                    <div className="w-32 bg-white border border-slate-200 rounded-lg p-3 text-sm text-center shadow-sm text-slate-400">
                      Cost: ---
                    </div>
                  </div>
                  {/* Link arrow */}
                  <div className="ml-8 text-slate-300">↓</div>
                  {/* Activity Node */}
                  <div className="flex gap-4 items-center">
                    <div className="flex-1 bg-white border border-slate-200 rounded-lg p-3 text-sm shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-2"><Hotel className="w-4 h-4 text-slate-400"/> Check-in Grand Hotel</div>
                    </div>
                    <div className="w-4 h-px bg-slate-300"></div>
                    <div className="w-32 bg-white border border-emerald-200 bg-emerald-50 rounded-lg p-3 text-sm text-center font-medium text-emerald-700 shadow-sm">
                      {formatCurrency(150, config.currency)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

        </div>

        {/* Right Column: Analytics & Widgets */}
        <div className="space-y-8">
          
          {/* Charts Section */}
          <Card title="Spending Analytics" icon={TrendingUp}>
            <div className="mb-6">
              <h4 className="text-sm font-medium text-slate-600 mb-4 text-center">Spending Breakdown</h4>
              <div className="h-48 w-full">
                {pieChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip formatter={(value) => formatCurrency(value, config.currency)} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400 text-sm">No expenses to display</div>
                )}
              </div>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {pieChartData.map(d => (
                  <div key={d.name} className="flex items-center gap-1.5 text-xs text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: d.color}}></span>
                    {d.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <h4 className="text-sm font-medium text-slate-600 mb-4 text-center">Planned vs Actual</h4>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                    <XAxis dataKey="name" tick={{fontSize: 10}} tickMargin={10} />
                    <YAxis tick={{fontSize: 10}} tickFormatter={(val) => `$${val}`} />
                    <RechartsTooltip cursor={{fill: '#f8fafc'}} formatter={(value) => formatCurrency(value, config.currency)} />
                    <Legend wrapperStyle={{fontSize: 10, paddingTop: 10}}/>
                    <Bar dataKey="Planned" fill="#cbd5e1" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="Actual" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>

          {/* Smart Recommendations */}
          <Card title="Smart Insights" icon={Lightbulb}>
            <div className="space-y-3">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="flex gap-3 bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                  <rec.icon className={`w-5 h-5 flex-shrink-0 ${COLORS.primary} mt-0.5`} />
                  <p className="text-sm text-slate-700 leading-snug">{rec.text}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Savings Goal */}
          <Card title="Savings Goal" icon={Target}>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-500">Trip Fund Target</span>
              <span className="font-semibold text-slate-800">{formatCurrency(savingsGoal.target, config.currency)}</span>
            </div>
            <ProgressBar 
              current={savingsGoal.saved} 
              max={savingsGoal.target} 
              colorClass="bg-blue-600" 
              heightClass="h-3"
            />
            <div className="flex justify-between text-xs mt-2 font-medium">
              <span className="text-blue-600">Saved: {formatCurrency(savingsGoal.saved, config.currency)}</span>
              <span className="text-slate-400">{(savingsGoal.target > 0 ? (savingsGoal.saved / savingsGoal.target) * 100 : 0).toFixed(0)}%</span>
            </div>
            <div className="mt-4 flex gap-2">
               <input 
                  type="number" 
                  placeholder="Update saved amount"
                  className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none"
                  onBlur={(e) => {
                    if(e.target.value) setSavingsGoal({...savingsGoal, saved: Number(e.target.value)});
                    e.target.value = '';
                  }}
                />
            </div>
          </Card>

          {/* Currency Converter (Mock Interface) */}
          <Card title="Currency Tool" icon={ArrowRightLeft}>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input type="number" defaultValue={100} className="w-1/2 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none" />
                <select className="w-1/2 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none">
                  {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex justify-center text-slate-400"><ArrowRightLeft className="w-4 h-4 rotate-90 md:rotate-0" /></div>
              <div className="flex items-center gap-2">
                 <input type="number" value={92.50} readOnly className="w-1/2 px-3 py-2 text-sm bg-slate-100 border border-slate-200 rounded-lg text-slate-500 outline-none" />
                 <select defaultValue="EUR" className="w-1/2 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none">
                  {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <p className="text-xs text-center text-slate-400 mt-2">* Demo static rate for mockup purposes.</p>
            </div>
          </Card>

        </div>
      </div>

      {}
      {isExpenseFormOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-semibold text-slate-800">{editingExpense ? 'Edit Expense' : 'Add New Expense'}</h3>
              <button onClick={() => {setIsExpenseFormOpen(false); setEditingExpense(null);}} className="text-slate-400 hover:text-slate-600">&times;</button>
            </div>
            <form onSubmit={handleExpenseSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
                <input 
                  required autoFocus type="text" 
                  value={expenseForm.name} onChange={e => setExpenseForm({...expenseForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g., Museum tickets"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Amount *</label>
                  <input 
                    required type="number" min="0" step="0.01"
                    value={expenseForm.amount} onChange={e => setExpenseForm({...expenseForm, amount: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                  <input 
                    type="date" 
                    value={expenseForm.date} onChange={e => setExpenseForm({...expenseForm, date: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <div className="grid grid-cols-3 gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id} type="button"
                      onClick={() => setExpenseForm({...expenseForm, category: cat.id})}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs transition-colors ${expenseForm.category === cat.id ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'}`}
                    >
                      <cat.icon className="w-4 h-4 mb-1" />
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Note (Optional)</label>
                <textarea 
                  value={expenseForm.note} onChange={e => setExpenseForm({...expenseForm, note: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  rows="2"
                ></textarea>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsExpenseFormOpen(false)} className="flex-1 px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">
                  {editingExpense ? 'Save Changes' : 'Add Expense'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}