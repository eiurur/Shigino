Chika
======

【WIP】 Twitter Moment Aggregator

![demo](https://github.com/eiurur/Chika/raw/master/demo.png)

# Usage

    npm i
    npm run dev

# API

### `/api/tweets/moments`

**parameters**

- word
- skip
- limit

**Ex**

    http://chika.eiurur.xyz/api/tweets/moments?limit=30&skip=0&word=%E8%89%A6%E3%81%93%E3%82%8C

**Output**

    λ curl "http://chika.eiurur.xyz/api/tweets/moments?limit=1&word=%E3%81%94%E3%81%A1%E3%81%86%E3%81%95" | python -mjson.tool
      % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                     Dload  Upload   Total   Spent    Left  Speed
    100   593  100   593    0     0   6860      0 --:--:-- --:--:-- --:--:--  7059
    {
        "count": 7,
        "moments": [
            {
                "__v": 0,
                "_id": "57f0d1a1ebc91de524c7d28b",
                "avater": "https://pbs.twimg.com/profile_images/782582933525704705/OhE_gxn4_mini.jpg",
                "count": 53,
                "created_at": "2016-10-09T09:36:26.594Z",
                "description": "\n        \u3054\u3061\u3046\u3055\u7d75\u307e\u3068\u30fc\u30e1\u30f3\u30c8\n      ",
                "expanded_url": "https://twitter.com/i/moments/782437849249435648",
                "fullname": "\u3074\u308a\u3077\u3093",
                "moment_id": "782437849249435648",
                "thumbnail": "https://pbs.twimg.com/media/CtvHPu6UAAA0lLb.jpg",
                "title": "\n          \u30e2\u30fc\u30e1\u30f3\u30c8\u300c\u3054\u3061\u3046\u3055\u306e\u5149\u300d\n\n      ",
                "updated_at": "2016-10-03T15:23:43.650Z",
                "username": "piripunpun"
            }
        ]
    }


### `/api/tweets/moments/@:username`

**parameters**

- skip
- limit

**Ex**

    http://chika.eiurur.xyz/api/tweets/moments/@tiv_

**Output**

    λ curl "http://chika.eiurur.xyz/api/tweets/moments/@tiv_" | python -mjson.tool
      % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                     Dload  Upload   Total   Spent    Left  Speed
    100  1756  100  1756    0     0  27927      0 --:--:-- --:--:-- --:--:-- 29266
    {
        "count": 3,
        "moments": [
            {
                "__v": 0,
                "_id": "57f3a911ebc91de524c7de04",
                "avater": "https://pbs.twimg.com/profile_images/760655479223615488/_J9PEqZ6_mini.jpg",
                "count": 47,
                "created_at": "2016-10-09T09:48:19.925Z",
                "description": "\n        \u6614\u306e\u753b\u50cf\u3067\u3059\u3051\u3069\u7fbd\u3064\u304d\u306e\u5973\u306e\u5b50\u307e\u3068\u3081\u3066\u307f\u307e\u3057\u305f\u3002\n      ",
                "expanded_url": "https://twitter.com/i/moments/783290594982449153",
                "fullname": "Tiv",
                "moment_id": "783290594982449153",
                "thumbnail": "https://pbs.twimg.com/media/BoCzqmrIUAEMWEc.png",
                "title": "\n          \u5929\u4f7f\u306e\u65e5\u306a\u306e\u3067\n\n      ",
                "updated_at": "2016-10-04T16:36:06.449Z",
                "username": "tiv_"
            },
            {
                "__v": 0,
                "_id": "57f0efc5ebc91de524c7d38e",
                "avater": "https://pbs.twimg.com/profile_images/760655479223615488/_J9PEqZ6_mini.jpg",
                "count": 16,
                "created_at": "2016-10-09T09:48:19.925Z",
                "description": "\n        \u30a4\u30e9\u30b9\u30c8\u3092\u4e00\u90e8\u307e\u3068\u3081\u3066\u307f\u307e\u3057\u305f\u3002\n      ",
                "expanded_url": "https://twitter.com/i/moments/782389285395718144",
                "fullname": "Tiv",
                "moment_id": "782389285395718144",
                "thumbnail": "https://pbs.twimg.com/media/CWW6GbGVAAAU_FA.png",
                "title": "\n          \u30a4\u30e9\u30b9\u30c8\u307e\u3068\u3081\n\n      ",
                "updated_at": "2016-10-08T13:35:17.271Z",
                "username": "tiv_"
            },
            {
                "__v": 0,
                "_id": "57f0d35eebc91de524c7d2b9",
                "avater": "https://pbs.twimg.com/profile_images/760655479223615488/_J9PEqZ6_mini.jpg",
                "count": 7,
                "created_at": "2016-10-09T09:48:19.925Z",
                "description": "\n        \u9023\u8f09\u521d\u671f\u304b\u3089\u4eca\u307e\u3067\u306e\u753b\u50cf\u3092\u4e00\u90e8\u307e\u3068\u3081\u307e\u3057\u305f\u3002\n      ",
                "expanded_url": "https://twitter.com/i/moments/782381521164378118",
                "fullname": "Tiv",
                "moment_id": "782381521164378118",
                "thumbnail": "https://pbs.twimg.com/media/B-2Ur1MVIAIcpTD.png",
                "title": "\n          \u653f\u5b97\u304f\u3093\u306e\u30ea\u30d9\u30f3\u30b8\u95a2\u9023\u30a4\u30e1\u30fc\u30b8\n\n      ",
                "updated_at": "2016-10-04T16:40:15.594Z",
                "username": "tiv_"
            }
        ]
    }