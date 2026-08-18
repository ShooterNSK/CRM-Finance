-- Схема базы данных CRM Finance
-- Запускается один раз при первой настройке базы:
--   psql "$DATABASE_URL" -f src/db/schema.sql

CREATE TABLE IF NOT EXISTS clients (
  id              SERIAL PRIMARY KEY,
  telegram_id     BIGINT UNIQUE NOT NULL,
  client_type     VARCHAR(10) NOT NULL CHECK (client_type IN ('ip', 'samozanyaty', 'ooo')),
  full_name       VARCHAR(255) NOT NULL,
  inn             VARCHAR(12) NOT NULL,
  ogrn            VARCHAR(15),
  tax_regime      VARCHAR(50),
  employees_count INTEGER DEFAULT 0,
  region          VARCHAR(255),
  integration_1c  VARCHAR(20) DEFAULT 'none' CHECK (integration_1c IN ('none', 'fresh', 'desktop', 'zup')),
  is_verified     BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS accountants (
  id              SERIAL PRIMARY KEY,
  telegram_id     BIGINT UNIQUE NOT NULL,
  full_name       VARCHAR(255) NOT NULL,
  inn             VARCHAR(12) NOT NULL,
  specialization  VARCHAR(100),
  experience_years INTEGER,
  is_approved     BOOLEAN DEFAULT FALSE,
  is_available    BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS applications (
  id              SERIAL PRIMARY KEY,
  client_id       INTEGER REFERENCES clients(id),
  type            VARCHAR(50) NOT NULL, -- 'report', 'consultation', 'tax_calc'
  status          VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'done', 'cancelled')),
  assigned_accountant_id INTEGER REFERENCES accountants(id),
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id              SERIAL PRIMARY KEY,
  client_id       INTEGER REFERENCES clients(id),
  accountant_id   INTEGER REFERENCES accountants(id),
  sender          VARCHAR(20) NOT NULL CHECK (sender IN ('client', 'ai', 'accountant', 'system')),
  message         TEXT NOT NULL,
  escalated       BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clients_telegram_id ON clients(telegram_id);
CREATE INDEX IF NOT EXISTS idx_accountants_telegram_id ON accountants(telegram_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_client_id ON chat_messages(client_id);
CREATE INDEX IF NOT EXISTS idx_applications_client_id ON applications(client_id);
