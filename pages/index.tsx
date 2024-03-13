import Botao from "@/components/Botao";
import Questao from "@/components/Questao";
import Questionario from "@/components/Questionario";
import QuestaoModel from "@/model/questao";
import RespostaModel from "@/model/resposta";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";



const BASE_URL = 'http://localhost:3000/api'

export default function Home() {

  const router = useRouter()

  const [questao, setQuestao] = useState<QuestaoModel>()
  const [respostasCertas, setRespostasCertas] = useState<number>(0)
  const [idsDasQuestoes, setidsDasQuestoes] = useState<number[]>([])

  async function carregarIdDasQuestoes() {
      const resp = await fetch(`${BASE_URL}/questionario`)
      const idsDasQuestoes = await resp.json()
      setidsDasQuestoes(idsDasQuestoes)
      console.log(idsDasQuestoes)
  }
  async function carregarQuestao(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
    const json = await resp.json()
    const novaQuestao = QuestaoModel.fromObject(json)

    setQuestao(novaQuestao)
}

useEffect(() => {
  carregarIdDasQuestoes()
}, [])

useEffect(() => {
  idsDasQuestoes.length > 0 && carregarQuestao(idsDasQuestoes[0])
}, [idsDasQuestoes])

function questaoRespondida(questaoRespondida: QuestaoModel){
  setQuestao(questaoRespondida)
  const acertou = questaoRespondida.acertou
  setRespostasCertas(respostasCertas + (acertou? 1:0))
}

  function idProximaPergunta(){
    if(questao){
      const proximoIndice = idsDasQuestoes.indexOf(questao.id) + 1
      return idsDasQuestoes[proximoIndice]
    }
  }


    



function proixmoPasso(){
  const proximoId = idProximaPergunta()
  proximoId ? proximaQuestao(proximoId) : finalizar()
}

function proximaQuestao(proximoId:number){
  carregarQuestao(proximoId)
}

function finalizar(){
  router.push({
    pathname: '/resultado',
    query: {
      total: idsDasQuestoes.length,
      certas: respostasCertas
    }
  })
}

  return questao ? 
    <Questionario questao={questao} ultima={idProximaPergunta() === undefined} questaoRespondida={questaoRespondida} proximoPasso={proixmoPasso}/>
    
    : false
}
