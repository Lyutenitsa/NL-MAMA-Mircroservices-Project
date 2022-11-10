from pydantic import BaseSettings


class Setting(BaseSettings):
	database_host: str
	database_port: int
	database_password: str
	database_username: str
	database_name: str
	
	class Config:
		env_file = ".env_local"
	
	
settings = Setting()
# print(settings)

