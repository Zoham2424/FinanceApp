# Finance Tracker App

## Overview
Finance Tracker is a mobile application built with **React Native (Expo)** that allows users to track their purchases and subscriptions. The app displays weekly, monthly, and yearly spending and integrates with a backend API hosted on **AWS EC2** and a **MySQL RDS database**.

---

## Technology Stack

**Frontend:**
- React Native (via Expo)
- JavaScript
- Expo CLI

**Backend:**
- C# .NET 7 Web API
- Hosted on AWS EC2
- Handles GET and POST requests for transactions

**Database:**
- MySQL on AWS RDS
- Stores transaction data (Name, Amount, Timestamp)

**Cloud Services:**
- AWS EC2 (API hosting)
- AWS RDS (Database)
- Security Groups (port 80 for API, port 3306 for EC2 to RDS)

**Other Tools:**
- GitHub for version control
- VS Code for development
- npm for package management

---

## Setup Instructions

### 1. Backend Setup (EC2)

1. Connect to your EC2 instance via SSH.
2. Navigate to your backend project folder:
   ```bash
   cd FinanceAPI
