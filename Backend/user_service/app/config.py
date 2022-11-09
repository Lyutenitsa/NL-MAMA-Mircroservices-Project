from pydantic import BaseSettings


class Setting(BaseSettings):
	database_host: str
	database_port: int
	database_password: str
	database_username: str
	database_name: str
	
	secret_key: str
	algorithm: str
	access_token_expire_minutes: int
	
	class Config:
		env_file = ".env_local"
	
	
settings = Setting()
# print(settings)

