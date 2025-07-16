from bson import ObjectId

def convert_object_ids(obj):
    if isinstance(obj, list):
        return [convert_object_ids(item) for item in obj]
    elif isinstance(obj, dict):
        return {
            key: convert_object_ids(value)
            for key, value in obj.items()
        }
    elif isinstance(obj, ObjectId):
        return str(obj)
    else:
        return obj
