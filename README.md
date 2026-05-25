# No Reboot Config Dashboard

A production-grade, dynamic runtime configuration management platform designed to update microservice behavior instantly without service redeployments or backend restarts.

🔗 **Live Link:** [https://no-reboot.vercel.app/](https://no-reboot.vercel.app/)

---

## 🏗️ System Architecture

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
