# GovConnect - Your Gateway to All Government Services

GovConnect is a comprehensive government service portal that enables citizens to access various government services online. The platform provides different interfaces for citizens, officers, administrators, and analysts.

## 🚀 Quick Start with Docker Compose

### Prerequisites

- Docker and Docker Compose installed on your system
- Git (to clone the repository)

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd GovConnect
   ```

2. Rename the `/api/.env copy` as `.env` and fill the required details. (for rootcode team we given the credientials with the document)
3. **Start the application using Docker Compose**

   ```bash
   docker-compose up -d
   ```

   This command will:

   - Start a MySQL database
   - Run database migrations
   - Seed the database with initial data
   - Start the backend API server
   - Start the frontend development server

4. **Access the application**
   - **Frontend**: http://localhost:5173
   - **Backend API**: http://localhost:3001
   - **Database**: localhost:3306

### Services Overview

| Service        | Port | Description                         |
| -------------- | ---- | ----------------------------------- |
| Frontend       | 5173 | React application (Vite dev server) |
| Backend API    | 3001 | Node.js/Express API server          |
| MySQL Database | 3306 | Database server                     |

## 👥 Sample Login Credentials

The application comes pre-seeded with sample users for testing different roles:

### 🔐 Administrator Access

- **Email**: `chandana@gmail.com`
- **Password**: `cha@123`
- **Role**: Administrator
- **Features**: Full system access, user management, system configuration

### 👮 Officer Access

- **Email**: `ravindu@gmail.com`
- **Password**: `cha@123`
- **Role**: Officer
- **Features**: Service management, citizen request handling, document processing

### 📊 Analyst Access

- **Email**: `ashfa@gmail.com`
- **Password**: `cha@123`
- **Role**: Analyst
- **Features**: Data analysis, reporting, system insights

### 🏠 Citizen Access

- **Email**: `kamal.perera@example.com`
- **Password**: `123`
- **Role**: Citizen
- **Features**: Service requests, document submissions, appointment booking

**Additional Citizen Accounts:**

- **Email**: `nadeesha.fernando@example.com` | **Password**: `123`
- **Email**: `sajith.wijesinghe@example.com` | **Password**: `123`

### Docker Commands

#### Start all services

```bash
docker-compose up -d
```

#### Stop all services

```bash
docker-compose down
```

#### View logs

```bash
# All services
docker-compose logs

# Specific service
docker-compose logs api
docker-compose logs frontend
docker-compose logs database
```

#### Rebuild and restart

```bash
docker-compose down
docker-compose up -d --build
```

#### Reset database (removes all data)

```bash
docker-compose down -v
docker-compose up -d
```

## 📁 Project Structure

```
GovConnect/
├── api/                    # Backend API
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── migrations/     # Database migrations
│   │   └── seeders/        # Database seed data
│   └── Dockerfile
├── src/                    # Frontend React app
│   ├── components/         # React components
│   ├── pages/             # Application pages
│   ├── services/          # API services
│   └── store/             # State management
├── public/                # Static assets
├── docker-compose.yml     # Docker configuration
└── Dockerfile.frontend    # Frontend Docker config
```

## 🔧 Troubleshooting

### Common Issues

1. **Port conflicts**: If ports 3001, 5173, or 3306 are in use, stop the services using those ports or modify the docker-compose.yml file.

2. **Database connection issues**: Wait a few moments for the database to fully initialize before the API tries to connect.

3. **Migration failures**: If migrations fail, try:

   ```bash
   docker-compose down -v
   docker-compose up -d
   ```

4. **Frontend not loading**: Check if the backend is running and accessible at http://localhost:3001

### Logs and Debugging

```bash
# Check if all containers are running
docker-compose ps

# View detailed logs
docker-compose logs -f

# Access container shell
docker-compose exec api bash
docker-compose exec frontend sh
```

## 📝 Features

- **Multi-role Authentication**: Support for Citizens, Officers, Administrators, and Analysts
- **Service Management**: Government service catalog and request handling
- **Document Management**: Upload and manage official documents
- **Appointment Booking**: Schedule appointments with government offices
- **Feedback System**: Collect and manage citizen feedback
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Live status updates for service requests

## 🔒 Security

- JWT-based authentication for different user roles
- Password hashing using bcrypt
- Role-based access control
- Secure file upload handling
