%dw 2.4
input payload json
output xml
---
{
    users: {
        user: payload
    }
}