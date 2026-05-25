# No Reboot Config Dashboard

A production-grade, dynamic runtime configuration management platform designed to update microservice behavior instantly without service redeployments or backend restarts.

 **Live Link:** [https://no-reboot.vercel.app/](https://no-reboot.vercel.app/)

 **FieldCredentials Username: admin Password:no_reboot#2026**

---

##  System Architecture

The system is designed using a **Cache-Aside (Lazy Loading)** architecture to maximize read throughput from external consumer microservices while protecting the primary relational database from heavy polling traffic.

```text
                               +-------------------------+
                               |  React Admin Dashboard  |
                               +------------+------------+
                                            |
                                            | HTTP (REST)
                                            v
                               +------------+------------+
                               |     NestJS Backend      |
                               +---+-----------------+---+
                                   |                 |
                   1. Write / Evict|                 | 2. Read (Cache Miss)
                                   v                 v
                         +---------+--------+  +-----+------------+
                         |   Redis Cache    |  |  PostgreSQL DB   |
                         | (Invalidation)   |  | (Source of Truth)|
                         +------------------+  +------------------+


Architectural Workflow
High-Throughput Reads (GET): The backend checks the Redis cache first. If a cache hit occurs, data is served in fractions of a millisecond. On a cache miss, data is pulled from PostgreSQL and backfilled into Redis with a 60-second TTL.

Instant Write Invalidation (PUT/POST/DELETE): To prevent the "stale data" dilemma across distributed services, any mutation to the database triggers an automated global eviction sequence (redis.del('configs:*')), ensuring immediate consistency

Tech Stack
Frontend: React, Tailwind CSS, Axios, Vercel

Backend: NestJS, TypeScript, TypeORM, PostgreSQL, Railway

Caching & Performance: Redis

Local Setup & Installation
Prerequisites
Node.js (v18 or higher)
Docker and Docker Compose

git clone https://github.com/Manikandan-Premkumar/No-reboot.git

cd No-reboot

2. Configure Environment Variables
Create a .env file in your backend directory accordingly.

3. Spin Up Infrastructure via Docker
Launch your database and caching services locally:
Bash
docker-compose up -d

4. Run the Application

npm install
npm run start:dev



