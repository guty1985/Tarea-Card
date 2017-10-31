var restify = require('restify');
var builder = require('botbuilder');

// Levantar restify
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// No te preocupes por estas credenciales por ahora, luego las usaremos para conectar los canales.
var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

// Ahora utilizamos un UniversalBot
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Dialogos
// AnimationCard
bot.dialog('/', [
    function (session) {
        var AnimationCard = new builder.AnimationCard(session)
        .title('Trasformacion Goku ')
        .subtitle('Animation Card')
        .image(builder.CardImage.create(session, 'https://docs.microsoft.com/en-us/bot-framework/media/how-it-works/architecture-resize.png'))
        .media([
            { url: 'https://media.giphy.com/media/e2tSgEk1k8Baw/giphy.gif' }
        ]);
        var msj = new builder.Message(session).addAttachment(AnimationCard);
        session.send(msj);
        session.beginDialog('/1');
    }
]);

//ThumbnailCard

bot.dialog('/1', [
    function (session) {
        var ThumbnailCard = new builder.ThumbnailCard(session)
        .title('BotFramework Thumbnail Card')
        .text('Cree y conecte bots inteligentes para interactuar con sus usuarios, naturalmente, donde sea que estén, desde texto / sms hasta Skype, Slack, correo de Office 365 y otros servicios populares.')
        .images([
            builder.CardImage.create(session, 'https://docs.microsoft.com/en-us/bot-framework/media/how-it-works/architecture-resize.png')
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'https://docs.microsoft.com/bot-framework', 'Ir Pagina')
        ]);

        // Adjuntamos la tarjeta al mensaje
        var msj = new builder.Message(session).addAttachment(ThumbnailCard);
        session.send(msj);
        session.beginDialog('/2');
    }
]);

//SigninCard
bot.dialog('/2', [
    function (session) {
        var SigninCard = new builder.SigninCard(session)
        .text('Para Acceder al sistema')
        .button('Acceder', 'https://login.microsoftonline.com')

        // Adjuntamos la tarjeta al mensaje
        var msj = new builder.Message(session).addAttachment(SigninCard);
        session.send(msj);
        session.beginDialog('/3');
    }
]);

//VideoCard
bot.dialog('/3', [
    function (session) {
        var VideoCard = new builder.VideoCard(session)
        .title('Capitulo Dragon Ball Super')
        .text('Serie Animada Japonesa')
        .image(builder.CardImage.create(session, 'http://lanetadurango.com/wp-content/uploads/2017/08/3-dragon-ball-.jpg'))
        .media([
            { url: 'https://www.youtube.com/watch?v=LzpAI1Clruk' }
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'http://www.cinecalidad.to/', 'Mas Informacion')
        ]);
        var msj = new builder.Message(session).addAttachment(VideoCard);
        session.send(msj);
        session.beginDialog('/4');
    }
]);

//AudioCard
bot.dialog('/4', [
    function (session) {
        var AudioCard = new builder.AudioCard(session)
        .title('Batman')
        .subtitle('Batman el caballero de la noche')
        .text('Es una película épica estadounidensedirigida por Irvin Kershner..')
        .image(builder.CardImage.create(session, 'http://cdn2.actitudfem.com/media/files/styles/large/public/images/2011/12/batman_.jpg'))
        .media([
            { url: 'http://www.wavlist.com/movies/307/btmn-dance.wav' }
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'http://www.actitudfem.com/guia/cine-y-television/trailer-de-la-nueva-pelicula-de-batman', 'Mas Informacion')
        ]);
        var msj = new builder.Message(session).addAttachment(AudioCard);
        session.send(msj);
        session.beginDialog('/5');
    }
]);
//ReceiptCard
bot.dialog('/5', [
    function (session) {
        var ReceiptCard = new builder.ReceiptCard(session)
        .title('Fernando')
        .facts([
            builder.Fact.create(session, 'VISA 3185-****', 'Davivienda')
        ])
        .items([
            builder.ReceiptItem.create(session, '$ 38.45', 'Datos Transferencia')
                .quantity(368)
                .image(builder.CardImage.create(session, 'https://mlxprodcontent.blob.core.windows.net/015551-1000/en-us/thumbnail.png?v=20170413220828')),
            builder.ReceiptItem.create(session, '$ 45.00', 'App Servicio')
                .quantity(720)
                .image(builder.CardImage.create(session, 'http://csharpcorner.mindcrackerinc.netdna-cdn.com/article/build-first-bot-application-with-microsoft-bot-framework/Images/image003.gif'))
        ])
        .tax('$ 7.50')
        .total('$ 90.95')
        .buttons([
            builder.CardAction.openUrl(session, 'https://mva.microsoft.com/product-training/visual-studio-courses', 'More Information')
                .image('https://raw.githubusercontent.com/amido/azure-vector-icons/master/renders/microsoft-azure.png')
        ]);
        var msj = new builder.Message(session).addAttachment(ReceiptCard);
        session.send(msj);
    }
]);

