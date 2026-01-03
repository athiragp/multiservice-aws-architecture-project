# MULTI-SERVICE AWS ARCHITECTURE PROJECT

A production-style, serverless e-commerce order processing system built using AWS managed services.  
This project demonstrates real-world cloud architecture patterns, security, scalability, and observability.

---

## 🚀 Project Overview

This project simulates a grocery ordering platform with:
- A **public user-facing website**
- A **secure admin dashboard**
- **Event-driven backend**
- **Real-time vendor notifications**

---

## 🧩 Architecture Summary

### User Order Flow
User Browser  
→ CloudFront (HTTPS + CDN)  
→ Amazon S3 (Static Website)  
→ API Gateway (HTTP API)  
→ AWS Lambda (Order Processing)  
→ Amazon DynamoDB (Orders Table)  
→ Amazon SNS (Email Notification to Vendor)

### Admin Flow
Admin Browser  
→ Amazon S3 (Admin Dashboard)  
→ API Gateway (/prod/admin/orders)  
→ Admin Lambda  
→ DynamoDB (Scan Orders)  
→ Admin UI renders latest orders

---

## 🛠 AWS Services Used

- Amazon S3 – Static website hosting
- Amazon CloudFront – Global CDN + HTTPS
- Amazon API Gateway (HTTP APIs) – Backend routing
- AWS Lambda – Business logic
- Amazon DynamoDB – Orders database
- Amazon SNS – Vendor notifications
- Amazon Route 53 – Custom domain routing
- IAM – Least-privilege access control

---

## 🔒 Security & Best Practices

- HTTPS enforced using CloudFront
- CORS configured on API Gateway
- IAM roles with least privilege
- Admin APIs isolated from public APIs
- No hardcoded credentials

---

## 🧪 Features Implemented

- Order placement from frontend
- Order persistence in DynamoDB
- Email notifications to vendors
- Admin dashboard to view & sort orders
- Custom domains for frontend and admin
- Serverless, fully managed architecture

---

## ⚠️ Challenges Faced & Solutions

### 1. Decimal Serialization from DynamoDB
**Issue:** DynamoDB returns Decimal types  
**Solution:** Custom JSON encoder in Lambda

### 2. CORS Errors in Browser
**Issue:** API calls blocked by browser  
**Solution:** Proper CORS headers in API Gateway + Lambda

### 3. Admin API Security
**Issue:** Public access to admin endpoints  
**Solution:** API Gateway API Keys + Usage Plans

### 4. Sorting Orders by Latest Timestamp
**Issue:** Mixed timestamp formats  
**Solution:** Normalized timestamps in frontend JS

---

## 📌 Future Enhancements

- Cognito-based authentication
- Pagination using DynamoDB Query
- Order status updates
- CloudWatch dashboards & alarms
- Infrastructure as Code (Terraform)

---

## 📄 License
MIT License
