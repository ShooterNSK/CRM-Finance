# CRM Finance — Architecture

## Product

CRM Finance — SaaS-платформа для бухгалтерского обслуживания,
финансового сопровождения и взаимодействия предпринимателей
с бухгалтерами.

## Applications

### Mini App
Telegram Mini App для клиентов.

### Admin
CRM-интерфейс для бухгалтеров и администраторов.

### API
Основной backend API.

## Core domains

- Users
- Organizations
- Clients
- Accountants
- Applications
- Tasks
- Documents
- Conversations
- Payments
- Taxes
- Integrations
- AI
- Notifications
- Audit

## Infrastructure

- PostgreSQL
- Redis
- Docker
- Nginx
- Object Storage

## Integrations

- Telegram
- 1C
- FNS
- Payment providers

## Security

Authentication:
Telegram Mini App authentication.

Authorization:
RBAC.

Sensitive operations:
Audit logging.

## Development principle

Prototype code is treated as a reference.
Production architecture is developed separately and incrementally.
