import React from 'react';
import { Card, Button, Table, Badge } from 'antd';
import { 
  HomeOutlined, 
  CalendarOutlined, 
  FormOutlined,
  LogoutOutlined,
  UserOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Data for off days
  const offDays = [
    { date: '03', day: 'Mon' },
    { date: '05', day: 'Tue' },
    { date: '16', day: 'Sat' },
    { date: '22', day: 'Fri' },
    { date: '31', day: 'Sun' },
  ];

  // Data for available shifts
  const shifts = [
    { id: '18', day: 'Monday', type: 'Day' },
    { id: '25', day: 'Monday', type: 'Day' },
    { id: '27', day: 'Wednesday', type: 'Day' },
  ];

  // Columns for shifts table
  const shiftColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'day',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Badge 
          color={type === 'Day' ? 'blue' : 'orange'} 
          text={type} 
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Button 
          type="link" 
          onClick={() => navigate('/dashboard/shifts')}
        >
          Apply
        </Button>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Roster</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Good Morning, Ranjith!</span>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <UserOutlined className="text-blue-500" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Off Days Section */}
        <Card 
          title="Your Off days in this month" 
          className="mb-6"
          extra={<Button type="link" onClick={() => navigate('/dashboard/calendar')}>View Calendar</Button>}
        >
          <div className="flex justify-between mb-4">
            {offDays.map((day) => (
              <div key={day.date} className="text-center">
                <div className="text-xl font-bold">{day.date}</div>
                <div className="text-gray-500">{day.day}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Schedule Off Days Section */}
        <Card 
          title="Schedule Off Days" 
          className="mb-6"
          extra={
            <Button 
              type="primary" 
              onClick={() => navigate('/dashboard/leave')}
            >
              Apply leave
            </Button>
          }
        >
          <div className="mb-4">
            <h3 className="font-medium mb-2">Available Shifts</h3>
            <Button 
              type="link" 
              icon={<CalendarOutlined />}
              onClick={() => navigate('/dashboard/shifts')}
            >
              View All
            </Button>
          </div>

          <Table
            dataSource={shifts}
            columns={shiftColumns}
            pagination={false}
            rowKey="id"
          />
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex justify-around">
            <Button 
              type="text" 
              icon={<HomeOutlined />}
              className="flex flex-col items-center"
              onClick={() => navigate('/dashboard')}
            >
              Home
            </Button>
            <Button 
              type="text" 
              icon={<CalendarOutlined />}
              className="flex flex-col items-center"
              onClick={() => navigate('/dashboard/calendar')}
            >
              Calendar
            </Button>
            <Button 
              type="text" 
              icon={<FormOutlined />}
              className="flex flex-col items-center"
              onClick={() => navigate('/dashboard/requests')}
            >
              Request
            </Button>
            <Button 
              type="text" 
              icon={<LogoutOutlined />}
              className="flex flex-col items-center"
              onClick={() => navigate('/login')}
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;