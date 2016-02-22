<?php
header("Content-type: text/xml");

echo '<?xml version="1.0" encoding="UTF-8" ?>
<Response>
    <Gather numDigits="1" action="/tw-resp.php?id=' . $_GET['id'] . '" method="GET">
      <Say voice="alice" language="pt-BR" loop="3">Bom dia ' . $_GET['paciente'] . 
        '. Gostaria de confirmar sua consulta com o doutor ' . $_GET['medico'] . 
        ', para o dia ' . $_GET['dia'] . 
        ', as ' . $_GET['hora'] . 
        '. Tecle 1 para confirmar ou 3 para cancelar.
      </Say>
    </Gather>
    <Say voice="alice" language="pt-BR">
      Nenhuma resposta foi recebida. Iremos retornar mais tarde. Obrigada.
    </Say>
</Response>';
?>

console.log('http://smartclinik.com/tw.php?paciente=' + encodeURIComponent(newEvent.title)
        + '&medico=' + encodeURIComponent(req.user.name)
        + '&dia=' + moment(newEvent.start).format('D')
        + '&hora=' + moment(newEvent.start).format('h:m');

        /*  //Place a phone call, and respond with TwiML instructions from the given URL
  tw.makeCall({
      to:'+5521999151188', // Any number Twilio can call
      from: '+552140420373', // A number you bought from Twilio and can use for outbound communication
      // A URL that produces an XML document (TwiML) which contains instructions for the call
      url: 'http://smartclinik.com/tw.php?paciente=' + encodeURIComponent(newEvent.title)
        + '&medico=' + encodeURIComponent(req.user.name)
        + '&dia=' + newEvent.start
  }, function(err, responseData) {
      //executed when the call has been initiated.
      console.log(responseData.from); // outputs "+14506667788"
  });
*/

Ao criar um evento
ver qual o dia de hj
event = hj ou event = hj + 1 -> nao liga
event = hj + 2 (daqui a dois dias) -> liga amanha
event = hj + 3 (daqui a 3 dias) -> liga amanha
outro caso -> liga com 3 dias de antecedencia

Ao mudar o evento reverifica tudo isso

Quando a ligacao der erro: