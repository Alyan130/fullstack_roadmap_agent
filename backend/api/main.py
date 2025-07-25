from fastapi import FastAPI, HTTPException , status , BackgroundTasks
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from database.connection import db
from models.user import User
from models.roadmap import Roadmap
from models.profile import Profile
from main import run_agents
from utils.api_response import convert_object_ids
from agent.email_agent import send_email


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.post("/user")
async def add_user(user:User):
     exist = await db["user"].find_one({"email":user.email}) 
     if exist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User already exists")
     
     user_info = user.model_dump()
     result = await db["user"].insert_one(user_info)
     user_id = str(result.inserted_id)
     user_info["_id"] = user_id

     return JSONResponse(
         status_code=status.HTTP_201_CREATED,
         content={
             "message":"user created",
             "data":user_info
         }
     )


@app.post("/learning-profile")
async def profile_data(profile: Profile):
    try:
        data = profile.model_dump()
        result = await db["learning_profiles"].insert_one(data)
        
        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content={
                "message": "Learning profile created successfully",
                "data": {**data, "_id": str(result.inserted_id)}
            }
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,                       
            detail=f"Failed to create profile: {str(e)}"
        )


@app.get("/user")
async def get_user():
    cursor = db["user"].find().sort("_id",-1)
    users =  await cursor.to_list(length=1)
    if not users:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="User not found")
    else:
       user = users[0]
       user["_id"] = str(user['_id'])
       return JSONResponse(
           status_code=status.HTTP_200_OK,
          content={
              "data":user
          }
       )
    
@app.get("/learning-profile")
async def get_profile():
     cursor = db["learning_profiles"].find().sort("_id",-1)
     profiles = await cursor.to_list(length=1)
     if not profiles:
       raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Learning profile not found")
     else:
       profile = profiles[0]
       profile["_id"] = str(profile["_id"])
       return JSONResponse(
           status_code=status.HTTP_200_OK,
           content={
               "data":profile
           }
       )
     

@app.get("/learning-roadmap/latest")
async def get_roadmap():
   cursor = db["roadmap_details"].find().sort("_id",-1)
   data = await cursor.to_list(length=1)

   if not data:
       raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="roadmap details not found")
   else:
      roadmap = data[0]
      clean_data = convert_object_ids(roadmap)
      return JSONResponse(
          status_code=status.HTTP_200_OK,
          content={
              "data":clean_data
          }
      )
   

@app.get("/agent-working")
async def get_profile():
    cursor = db["learning_profiles"].find().sort("_id",-1)
    profiles = await cursor.to_list(length=1)
    
    if not profiles:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Learning profile not found")
    
    profile = profiles[0]
    profile["_id"] = str(profile["_id"])

    result = await run_agents(str(profile))

    cleaned_result = convert_object_ids(result)
    
    await db["roadmap_details"].insert_one(cleaned_result)

    data = convert_object_ids(cleaned_result)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "data": data
        }
    )



@app.get("/send-email")
async def send_mail():
   cursor = db["roadmap_details"].find().sort("_id",-1)
   data = await cursor.to_list(length=1)

   cursor = db["user"].find().sort("_id",-1)
   users =  await cursor.to_list(length=1)
   
   if not data and not users:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Roadmap not found")
   
   user = users[0]
   user_data = convert_object_ids(user)
   email= user_data["email"]

   clean_data = data[0]
   roadmap =  convert_object_ids(clean_data)
   
   await send_email(str(roadmap),email)

   return JSONResponse(
      status_code=status.HTTP_200_OK,
      content={
         "data":"Email send successully"
      }
   )
     