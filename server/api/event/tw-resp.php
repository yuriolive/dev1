<?php
header("Content-type: text/xml");

if($_REQUEST['Digits'] == 1) {
  //http_get(url);
  echo '<?xml version="1.0" encoding="UTF-8" ?>
  <Response>
      <Say voice="alice" language="pt-BR">
        A consulta foi confirmada com sucesso. Obrigada.
      </Say>
  </Response>';
} else if($_REQUEST['Digits'] == 3) {
  echo '<?xml version="1.0" encoding="UTF-8" ?>
  <Response>
      <Say voice="alice" language="pt-BR">
        A consulta foi cancelada com sucesso. Por favor acesse o site para reagendar sua consulta. Obrigada.
      </Say>
  </Response>';
} else {

}

?>