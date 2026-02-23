import json

with open('src/components/GoogleReviews.jsx', 'r') as f:
    content = f.read()

photos = {
  "Dominique van Do's Gym": "https://lh3.googleusercontent.com/a/ACg8ocIVsF0ZsNDuLW-E5FdeqHt-TqLzOJYj4WfDvxg1Crh1GjgaPG0=s128-c-rp-mo-br100",
  "Mike": "https://lh3.googleusercontent.com/a-/ALV-UjVFBc8JhkpUUEFxEuiSvv-1xvFtyz-sRWsHFfS7KTJnyPZuOZSD=s128-c-rp-mo-br100",
  "Kelt Jager": "https://lh3.googleusercontent.com/a-/ALV-UjVbt_MWCcpdUDOPjyBv8O1poTQgal9Ep7-FBtw9osaftSVFE05J=s128-c-rp-mo-br100",
  "Sanne Hendriks": "https://lh3.googleusercontent.com/a-/ALV-UjUtr9aBkNn4t7VGWL8Euk9916eoiGtScxy-gRd0cKEgM38fysUB=s128-c-rp-mo-br100",
  "Danielle Sabajo": "https://lh3.googleusercontent.com/a-/ALV-UjX2GxR3-hha_ojA1aXk34G-td_VUl6ZxB6jXsTqE_Q4Fm2xI44=s128-c-rp-mo-br100",
  "Tim Hortensius": "https://lh3.googleusercontent.com/a-/ALV-UjUURq0o-WQOus1TNQfZEkA3TBin7kO3W55BA1v098ZwquvVldk=s128-c-rp-mo-br100",
  "Hugo Le Jollec": "https://lh3.googleusercontent.com/a-/ALV-UjWslzeCT1gLSsrSTEwa1jq-NIDT67cu2NmkIJ4ynvWtIEB7_OI=s128-c-rp-mo-br100",
  "Murat Son": "https://lh3.googleusercontent.com/a-/ALV-UjUsjZz5qLlZ-BVl6Ejao50MrnXY_01sr918jmoOECc_fFUunt9J=s128-c-rp-mo-br100",
  "Radjin Pitai": "https://lh3.googleusercontent.com/a/ACg8ocLYXUiWXkpdYTfzXdfn7DVbAT9xlTPxEhdXwAnAhEWSNXgx8g=s128-c-rp-mo-br100",
  "Lars Ubachs": "https://lh3.googleusercontent.com/a/ACg8ocKEYj13AmM0ahilYw4dfn77WqgLmn80Jx2LzL_MfCUxhYV9=s128-c-rp-mo-br100",
  "J E": "https://lh3.googleusercontent.com/a-/ALV-UjX2-DTB_ey2gSX9evadOMIAWHl8XfFPjgjY3wo70FwlKlegYYmn=s128-c-rp-mo-ba2-br100",
  "Bodywork Sportstudio Roermond": "https://lh3.googleusercontent.com/a-/ALV-UjWK_si852_JrmNjiERE1_Y6OCj_53pB3qG6aTCbTPfLMPml9Us=s128-c-rp-mo-br100",
  "Michel Dekker": "https://lh3.googleusercontent.com/a/ACg8ocLvDGiZzh4tIIHtVT6vEJA5LC2xVtkKqJny4foCzGqaHjcz7g=s128-c-rp-mo-br100",
  "S Nicolas": "https://lh3.googleusercontent.com/a-/ALV-UjU2zXgmMVuNbQaNLlkGAqRqYM4rQeFsHsvqko3RXwM6O4CAB8GB=s128-c-rp-mo-br100",
  "Niels Bakker": "https://lh3.googleusercontent.com/a/ACg8ocIVsF0ZsNDuLW-E5FdeqHt-TqLzOJYj4WfDvxg1Crh1GjgaPG0=s128-c-rp-mo-br100"
}

import re

for author, url in photos.items():
    # Find the block starting with "author": "AUTHOR_NAME"
    pattern = r'("author": "' + re.escape(author) + r'".*?"text": "[^"]*")'
    
    def repl(m):
        # Only append if it doesn't already end with a comma (it shouldn't based on pattern)
        return m.group(1) + ',\n        "profile_photo": "' + url + '"'
        
    content = re.sub(pattern, repl, content, flags=re.DOTALL)

with open('src/components/GoogleReviews.jsx', 'w') as f:
    f.write(content)

print("Updated with Python!")
