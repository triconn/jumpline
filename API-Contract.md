# iQueue API

## API Contract

#### Contents

- Add Guest
- Get One Guest
- Get Current Guests
- Notify Guest
- Complete Guest
- Guest Status Options
- Update Estimate

#### Add Guest

```bash
curl -X POST https://api.example.com/guest     \
     -H 'Content-Type: application/json'        \
     -d '{ "name": "John Smith", "phone": "5551234567", "estimate": 15 }'
```

##### Response

```
Status: 201
```

```json
{
  "id": 1,
  "estimate": 15,
  "name": "John Smith",
  "phone": "5551234567",
  "status": "new",
  "createdAt": "2014-11-14T16:29:21Z",
  "updatedAt": "2014-11-14T16:29:21Z",
  "queuedAt": "2014-11-14T16:29:21Z",
  "estimatedAt": "2014-11-14T16:29:21Z"
}
```

#### Get One Guest

```bash
curl -X GET https://api.example.com/guest/1     \
     -H 'Content-Type: application/json'
```

##### Response

```
Status: 200
```

```json
{
  "id": 1,
  "estimate": 15,
  "name": "John Smith",
  "phone": "5551234567",
  "status": "new",
  "createdAt": "2014-11-14T16:29:21Z",
  "updatedAt": "2014-11-14T16:29:21Z",
  "queuedAt": "2014-11-14T16:29:21Z",
  "estimatedAt": "2014-11-14T16:29:21Z"
}
```

#### Get Current Guests

```bash
curl -X GET https://api.example.com/guest     \
     -H 'Content-Type: application/json'
```

##### Response

```
Status: 200
```

```json
[
  {
    "id": 1,
    "estimate": 15,
    "name": "John Smith",
    "phone": "5551234567",
    "status": "new",
    "createdAt": "2014-11-14T16:29:21Z",
    "updatedAt": "2014-11-14T16:29:21Z",
    "queuedAt": "2014-11-14T16:29:21Z",
    "estimatedAt": "2014-11-14T16:29:21Z"
  }, {
    "id": 2,
    "estimate": 15,
    "name": "Adam Smith",
    "phone": "5551235555",
    "status": "notified",
    "createdAt": "2014-11-14T16:29:21Z",
    "updatedAt": "2014-11-14T16:29:21Z",
    "queuedAt": "2014-11-14T16:29:21Z",
    "estimatedAt": "2014-11-14T16:29:21Z"
  }
]
```

#### Notify Guest

```bash
curl -X PUT https://api.example.com/guest/1/notify     \
     -H 'Content-Type: application/json'
```

##### Response

```
Status: 200
```

```json
{
  "id": 1,
  "estimate": 15,
  "name": "John Smith",
  "phone": "5551234567",
  "status": "notified",
  "createdAt": "2014-11-14T16:29:21Z",
  "updatedAt": "2014-11-14T16:29:21Z",
  "queuedAt": "2014-11-14T16:29:21Z",
  "estimatedAt": "2014-11-14T16:29:21Z"
}
```

#### Complete Guest

```bash
curl -X PUT https://api.example.com/guest/1/complete     \
     -H 'Content-Type: application/json'
```

##### Response

```
Status: 200
```

```json
{
  "id": 1,
  "estimate": 15,
  "name": "John Smith",
  "phone": "5551234567",
  "status": "completed",
  "createdAt": "2014-11-14T16:29:21Z",
  "updatedAt": "2014-11-14T16:29:21Z",
  "queuedAt": "2014-11-14T16:29:21Z",
  "estimatedAt": "2014-11-14T16:29:21Z"
}
```

#### Guest Status

Possible options:

```
new
notified
called
completed
cancelled
```

#### Update Estimate

```bash
curl -X PUT https://api.example.com/guest/1     \
     -H 'Content-Type: application/json'        \
     -d '{ "estimate": 20 }'
```

##### Response

```
Status: 200
```

```json
{
  "id": 1,
  "estimate": 20,
  "name": "John Smith",
  "phone": "5551234567",
  "status": "completed",
  "createdAt": "2014-11-14T16:29:21Z",
  "updatedAt": "2014-11-14T16:45:43Z",
  "queuedAt": "2014-11-14T16:29:21Z",
  "estimatedAt": "2014-11-14T16:45:43Z"
}
```
