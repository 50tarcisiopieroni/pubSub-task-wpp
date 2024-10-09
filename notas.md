
# Link para requisições do call me bot
https://api.callmebot.com/whatsapp.php?phone=[phone]&text=[Text]&apikey=[ApiKey]

### Parâmetros
**Phone:** DDI+DDD+NUMERO Ex:{ 5531912341234 } </br>
**Text:** Texto codificado em urlencoded </br>
**ApiKey:** Código informado após o primeiro contato no callMeBot 


Exemplo:
https://api.callmebot.com/whatsapp.php?phone=553199999999&text=This+is+a+test&apikey=30303030

# Link para dar permissão ao CallMeBot
https://wa.me//34684783708?text=I%20allow%20callmebot%20to%20send%20me%20messages


# Dependências
dependencias:

Correio:
npm add amqplib axios
npm install @types/amqplib @types/node ts-node typescript --only=dev

TaskManager:
npm add amqplib axios express cors
npm install @types/amqplib @types/node ts-node typescript --only=dev
npm install typescript ts-node nodemon @types/amqplib @types/cors @types/express @types/mongoose @types/node --only=dev