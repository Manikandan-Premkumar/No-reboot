# 🚀 No Reboot HQ

## What is this?

Ever had to restart your app just to change a setting? Like turning payments on/off or updating password rules?

**No Reboot HQ fixes that.** It's a central place where you store all your app settings, and your services can get them instantly without restarting.

## How it works
Your Service ──▶ No Reboot HQ ──▶ Database
│
└── Changes happen instantly, no restart needed!

text

## What you can do

✅ Store all your app configs in one place  
✅ Change settings without restarting your service  
✅ See who changed what and when (version history)  
✅ Go back to old settings with one click (rollback)  
✅ Control who can change what (admin vs regular users)  

## Quick Start (5 minutes)

### 1. Clone and run

```bash
git clone https://github.com/yourusername/no-reboot-hq.git
cd no-reboot-hq
docker-compose up -d
2. Create your first config
bash
curl -X POST http://localhost:3000/api/v1/config \
  -H "Content-Type: application/json" \
  -d '{"key":"payments.enabled","value":true}'
3. Use it in your service
javascript
// Your service code
const response = await fetch('http://localhost:3000/api/v1/config/payments.enabled/value');
const data = await response.json();

if (data.value === true) {
  // Process payment
}
4. Change it (no restart needed!)
bash
curl -X PUT http://localhost:3000/api/v1/config/payments.enabled \
  -H "Content-Type: application/json" \
  -d '{"value":false}'
That's it! Your service will see the change within seconds.



![db rows](https://github.com/user-attachments/assets/845ddfc7-687f-4e97-a4cc-9c211f92446d)



