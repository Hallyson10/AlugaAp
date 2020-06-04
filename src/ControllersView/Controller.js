export function Idade(date){
    var ano_aniversario = date.ano;
    var mes_aniversario = date.mes;
    var dia_aniversario = date.dia;
    var d = new Date(),
      ano_atual = d.getFullYear(),
      mes_atual = d.getMonth() + 1,
      dia_atual = d.getDate(),
      ano_aniversario = +ano_aniversario,
      mes_aniversario = +mes_aniversario,
      dia_aniversario = +dia_aniversario,
      quantos_anos = ano_atual - ano_aniversario;

    if (
      mes_atual < mes_aniversario ||
      (mes_atual == mes_aniversario && dia_atual < dia_aniversario)
    ) {
      quantos_anos--;
    }

    return quantos_anos < 0 ? 0 : quantos_anos;
  };

export function isValid(num) {
    //var telefone = '(31)3233-4343';
    return /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/.test(num)
}

export function verifyFormName(nome){
  return !!nome.match(/[A-Z][a-z]* [A-Z][a-z]*/);
}

export function verifyFormEmail(text){
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(text) === false) {
    return false;
  } else {
    return true;
  }
};
export function getMoney( str )
{
        return parseInt( str.replace(/[\D]+/g,'') );
}
export function formatReal(n) {
  return "R$ " + getMoney(n).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
  }