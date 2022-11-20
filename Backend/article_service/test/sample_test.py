import pytest
from app import schemas
# from .database import client, session
from app.main import app
from fastapi.testclient import TestClient


@pytest.fixture()
def client():
    yield TestClient(app)

def test_root(client):
    res = client.get("/")
    print(res.json().get('message'))
    assert res.json().get('message') == 'Hello from article service'
    assert res.status_code == 200

