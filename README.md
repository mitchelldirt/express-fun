# A fun project for me to mess around with different express js features!

## Things I've learned so far:
- How to use express js
- Controllers and routes
- Websockets
- Docker
  - docker compose
  - Docker file
  - Building for a different platform (needed to do this because I have an M1)
  - Pulling/pushing images from/to my private Azure container registry
  - Deploying container apps in Azure

## Notes / Commands I'm saving lol

Command to deactivate a container app revision - useful if you don't need to keep running your container app:

```bash
az containerapp revision deactivate -g resourceGroupName --revision containerAppRevisionName
```