# HR Support System

A comprehensive Human Resources support ticket management system built with Laravel 12 (backend) and React 19 (frontend). This application enables HR departments to efficiently manage employee support requests, track tickets, and streamline communication between employees and HR staff.

## 🚀 Features

### Core Functionality
- **User Authentication & Authorization**: JWT-based authentication with role-based access control
- **Ticket Management**: Create, update, assign, and track support tickets
- **Department Management**: Organize users and tickets by departments
- **Category Management**: Categorize tickets for better organization
- **User Management**: Admin panel for managing system users
- **Dashboard**: Overview of ticket statistics and system status
- **File Attachments**: Support for ticket attachments
- **Real-time Updates**: Live ticket status updates
- **AI Suggestions**: Intelligent ticket categorization and assignment suggestions

### User Roles
- **Admin**: Full system access, user management, department/category management
- **User**: Can create tickets, view their own tickets, update ticket status

## 🛠 Tech Stack

### Backend (Laravel 12)
- **Framework**: Laravel 12.0
- **Authentication**: JWT (tymon/jwt-auth)
- **API**: RESTful API with Laravel Sanctum
- **Database**: MySQL/PostgreSQL with Eloquent ORM
- **Testing**: PHPUnit
- **Queue System**: Laravel Queues for background processing

### Frontend (React 19)
- **Framework**: React 19.2.0
- **Build Tool**: Vite with Rolldown
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS 4.1.18
- **Routing**: React Router DOM 7.13.0
- **Forms**: Formik with Yup validation
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

### Development Tools
- **Code Quality**: ESLint
- **Version Control**: Git
- **Package Management**: Composer (PHP), npm (Node.js)

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **PHP**: 8.2 or higher
- **Composer**: Latest version
- **Node.js**: 18.0 or higher
- **npm**: Latest version
- **MySQL/PostgreSQL**: Database server
- **Git**: Version control system

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd hr-support-system
```

### 2. Backend Setup (Laravel)

#### Install PHP Dependencies
```bash
cd backend
composer install
```

#### Environment Configuration
```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

#### Database Setup
```bash
# Configure your database settings in .env file
# Example for MySQL:
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=hr_support_system
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Run migrations
php artisan migrate

# (Optional) Seed the database with sample data
php artisan db:seed
```

#### JWT Setup
```bash
# Generate JWT secret key
php artisan jwt:secret
```

#### Build Frontend Assets (for production)
```bash
# Install Node.js dependencies
npm install

# Build assets for production
npm run build
```

### 3. Frontend Setup (React)

#### Install Dependencies
```bash
cd ../frontend
npm install
```

#### Environment Configuration
Create a `.env` file in the frontend directory:
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### 4. Running the Application

#### Development Mode
```bash
# Backend (from backend directory)
composer run dev

# Frontend (from frontend directory)
npm run dev
```

#### Production Mode
```bash
# Backend
php artisan serve

# Frontend (build and serve)
npm run build
npm run preview
```

## 📊 Database Schema

### Tables Overview

#### Users Table
- `id`: Primary key
- `name`: User's full name
- `email`: Unique email address
- `password`: Hashed password
- `department_id`: Foreign key to departments
- `role`: Enum ('User', 'Admin')
- `status`: Enum ('Inactive', 'Active', 'Pending')
- `timestamps`: Created/updated timestamps

#### Departments Table
- `id`: Primary key
- `name`: Department name
- `description`: Department description
- `timestamps`: Created/updated timestamps

#### Categories Table
- `id`: Primary key
- `name`: Category name
- `description`: Category description
- `status`: Enum ('active', 'inactive')
- `timestamps`: Created/updated timestamps

#### Tickets Table
- `id`: Primary key
- `ticket_number`: Unique ticket identifier
- `title`: Ticket title
- `description`: Ticket description
- `priority`: Enum ('low', 'medium', 'high', 'critical')
- `category_id`: Foreign key to categories
- `department_id`: Foreign key to departments
- `due_date`: Optional due date
- `assigned_to`: Foreign key to users (assignee)
- `status`: Enum ('open', 'in_progress', 'resolved', 'closed')
- `created_by`: Foreign key to users (creator)
- `timestamps`: Created/updated timestamps

#### Ticket Attachments Table
- `id`: Primary key
- `ticket_id`: Foreign key to tickets
- `file_path`: Path to uploaded file
- `file_name`: Original file name
- `file_size`: File size in bytes
- `mime_type`: File MIME type
- `timestamps`: Created/updated timestamps

## 🔗 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/me` - Get current user info

### Users Management
- `GET /api/users` - Get all users (Admin only)
- `POST /api/users` - Create new user (Admin only)
- `PUT /api/users/{user}` - Update user (Admin only)

### Departments
- `GET /api/departments` - Get all departments
- `POST /api/departments` - Create department (Admin only)

### Categories
- `GET /api/category` - Get all categories
- `POST /api/category` - Create category (Admin only)
- `PUT /api/category/{id}` - Update category (Admin only)
- `PATCH /api/category/{id}/status` - Update category status (Admin only)

### Tickets
- `GET /api/tickets` - Get all tickets (filtered by user role)
- `POST /api/tickets` - Create new ticket
- `GET /api/tickets/{ticket_number}` - Get specific ticket
- `PUT /api/tickets/{ticket_number}` - Update ticket
- `PATCH /api/tickets/{ticket_number}/assign` - Assign ticket to user (Admin only)
- `POST /api/ai-suggest` - Get AI suggestions for ticket handling

## 🧪 Testing

### Backend Tests
```bash
cd backend
php artisan test
```

### Frontend Tests
```bash
cd frontend
npm run test
```

## 🚀 Deployment

### Production Checklist
- [ ] Set `APP_ENV=production` in `.env`
- [ ] Set `APP_DEBUG=false` in `.env`
- [ ] Configure proper database credentials
- [ ] Set `JWT_SECRET` for JWT authentication
- [ ] Configure mail settings for notifications
- [ ] Set proper file permissions for storage directories
- [ ] Configure web server (Apache/Nginx) to serve Laravel
- [ ] Set up SSL certificate
- [ ] Configure backup system for database

### Web Server Configuration

#### Nginx Example
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/hr-support-system/backend/public;

    index index.php index.html index.htm;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }

    location ~ /\.ht {
        deny all;
    }
}
```

#### Apache Example (.htaccess)
```apache
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

### Environment Variables
```env
# Application
APP_NAME="HR Support System"
APP_ENV=production
APP_KEY=base64:your-generated-key
APP_DEBUG=false
APP_URL=https://your-domain.com

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=hr_support_db
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password

# JWT
JWT_SECRET=your-jwt-secret

# Mail Configuration
MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-email@domain.com
MAIL_PASSWORD=your-email-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your-email@domain.com
MAIL_FROM_NAME="${APP_NAME}"

# Queue Configuration (if using queues)
QUEUE_CONNECTION=database
```

## 🔧 Development Scripts

### Backend Scripts
```bash
# Install dependencies
composer install

# Run development server with hot reload
composer run dev

# Run tests
composer run test

# Run migrations
php artisan migrate

# Generate JWT secret
php artisan jwt:secret

# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### Frontend Scripts
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📁 Project Structure

```
hr-support-system/
├── backend/                    # Laravel Backend
│   ├── app/
│   │   ├── Http/Controllers/   # API Controllers
│   │   ├── Models/            # Eloquent Models
│   │   └── Providers/         # Service Providers
│   ├── database/
│   │   ├── migrations/        # Database Migrations
│   │   └── seeders/          # Database Seeders
│   ├── routes/
│   │   └── api.php           # API Routes
│   ├── config/               # Configuration Files
│   ├── public/               # Public Assets
│   ├── resources/            # Views & Assets
│   └── tests/                # Test Files
├── frontend/                  # React Frontend
│   ├── src/
│   │   ├── app/              # Main App Component
│   │   ├── features/         # Feature-based Components
│   │   ├── layouts/          # Layout Components
│   │   ├── pages/            # Page Components
│   │   ├── routes/           # Routing Configuration
│   │   ├── services/         # API Services
│   │   └── utils/            # Utility Functions
│   ├── public/               # Static Assets
│   └── dist/                 # Built Assets (generated)
└── README.md                 # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 📈 Future Enhancements

- [ ] Real-time notifications with WebSockets
- [ ] Advanced reporting and analytics dashboard
- [ ] Mobile application (React Native)
- [ ] Integration with email systems
- [ ] SLA management
- [ ] Knowledge base system
- [ ] Multi-language support
- [ ] API rate limiting
- [ ] Audit logging

---

**Built with ❤️ using Laravel and React**