const functions = require('firebase-functions');
const admin = require('firebase-admin')
require('dotenv/config');

admin.initializeApp(functions.config().firebase);
const client = require('twilio')(
  process.env.TWILIO_ACCOUT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
function codAleatorio() {
  var text = "";
  var possible = "ALUGP0123456789";
  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
exports.confirmarNumber = functions.https.onRequest((req,res)=>{
  try {
    const numCodigo = codAleatorio();//gerando o codigo de verificação
      async function findExist(){
        if(req.body.cod){
          await client.messages.create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: req.body.to,
            body: `Seu código de verificação AlugaAp é ${req.body.cod}`
            })//enviando o codigo
            await admin.app().firestore().collection('telefones').doc(req.body.to).set({
              verificado : 'enviado',
              codigoVerificacao : req.body.cod
            })
            return res.status(200).json({verificado : 'enviado',codigoVerificacao : req.body.cod,sucess : true})
        }else{
          await client.messages.create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: req.body.to,
            body: `Seu código de verificação AlugaAp é ${numCodigo}`
            })
           
          await admin.app().firestore().collection('telefones').doc(req.body.to).set({
            verificado : 'enviado',
            codigoVerificacao : numCodigo
          })
          return res.status(200).json({verificado : 'enviado',codigoVerificacao : numCodigo,sucess : true})
        }
      }
      findExist();
    
  } catch (error) {
    return res.status(404).json({sucess : false})//sucess pra dizer se foi bem sucedido ou não
  }  
}) 

function send(phone,codigo){
      if(!validE164(req.body.to)){
          return false;
      }
      return client.messages
      .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
      body: `Seu código de verificação AlugaAp é ${codigo}`
      })
      .then((message) => {return true})
      .catch(error => {return false})
}

exports.verifyNumber = functions.https.onRequest((req,res)=>{
  client.verify.services.create({friendlyName: 'My verify service',codeLength:4}).then((service)=>{
    console.log('imprimindo o service.sid verifyNumber',service.sid)
    client.verify.services(service.sid)
      .verificationChecks
      .create({to: req.body.to, code: req.body.cod})
      .then(verification_check => {
        console.log('imprimindo verification check',verification_check)
        return res.json({sucess:true,status : verification_check.status})})
      .catch((error)=>{
        console.log('imprimindo erro do verifyNumber',error)
        return res.json({sucess:true,status : verification_check.status
        })})

  })
})


function validE164(num) {
  return /^\+?[1-9]\d{1,14}$/.test(num)//validar se o número é iniciado com o +55
}


exports.sendPushNotification = functions.firestore
  .document("vagasCompartilhadas/{posts}")
  .onCreate(event => {
    console.log('DataNotification',event.data())
    let tokenAutor = event.data().tokenNotification;
    const cidade = event.data().endereco.cidade;
    const completa = event.data().completa
    // either store the recepient tokens in the document write
    //const tokens = writeData.tokens;  

     // the payload is what will be delivered to the device(s)
    let msg = completa ? 'Imóvel completo' : 'Vaga compartilhada'
        let payload = {
            notification: {
            title: 'Uma nova vaga em '+cidade,
            subtitle :new Date().toISOString() ,
            body: msg 
        }
        }
    // or collect them by accessing your database
   // var userTokens = []
    return admin
      .firestore()
      .collection("users")
      .get()
      .then(doc => {
        doc.docs.forEach((item)=>{
          if(item.data().user.tokenNotification !== tokenAutor && item.data().user.receiveNotification){
            console.log('usersTokens '+item.data().user.tokenNotification,'AutorNotification '+tokenAutor);
            console.log('token Notification',item.data().user.tokenNotification)
            admin.messaging().sendToDevice(item.data().user.tokenNotification, payload);
          }
        })
          
         // sendToDevice can also accept an array of push tokens
         return true;
      });
});

exports.NotificationLikersPost = functions.firestore
    .document('likersPosts/{uid}/liker/{uidc}')
    .onCreate(async(snap, context) => {

      const { uid, uidc } = context.params;
      console.log('snap',snap.data())
      console.log('uid ',uid); //IdPost
      console.log('uidc',uidc); //IdUser
      let find = await admin.firestore().collection('likersPosts').doc(uid).collection('liker').get();
      let response = await find.docs.map((item)=>{
        return item.data();
     })
     let payload = {
      notification: {
      title: 'Marcou interesse!',
      body: snap.data().username + ' também se interessou pela vaga!'
       }
      }
      response.forEach((resul)=>{
        console.log('resul',resul);
        console.log('snap.data ',snap.data().tokenNotification)
        if(resul.tokenNotification !== snap.data().tokenNotification){
          console.log('enviou para ',resul.tokenNotification)
          admin.messaging().sendToDevice(resul.tokenNotification, payload);
        }
      })
      return true;
    });

    //enviar msg twilio
    //   res.header('Content-Type', 'application/json');
   