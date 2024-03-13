import { embaralhar } from "@/function/arrays"
import RespostaModel from "./resposta"

export default class QuestaoModel{
    #id: number
    #enunciado: string
    #respostas: any[]
    #acertou: boolean
    // #respondida: boolean
    constructor(id: number, enunciado:string, respostas: any[], acertou=false){
        this.#id = id
        this.#enunciado = enunciado
        this.#respostas = respostas
        this.#acertou = acertou
    }

    get id(){
        return this.#id
    }

    get enunciado(){
        return this.#enunciado
    }
    get respostas(){
        return this.#respostas
    }
    get acertou(){
        return this.#acertou
    }
    get respondida(){
        for(let respostas of this.#respostas){
            if(respostas.revelada) return true
        }
        return false
    }
    get naoRespondida(){
        for(let respostas of this.#respostas){
            if(respostas.revelada) return false
        }
        return true
    }

    responderCom(indice:number): QuestaoModel{
        const acertou = this.#respostas[indice]?.certa
        const respostas = this.#respostas.map((res, i) => {
            const respostaSelecionada = indice === i
            const deveRevelar = respostaSelecionada || res.certa
            return deveRevelar ? res.revelar() : res
        })
        return new QuestaoModel(this.#id, this.#enunciado, respostas, acertou)
    }


    embaralharRespostas(){
        let respostasEmbaralhadas = embaralhar(this.#respostas)
        return new QuestaoModel(this.#id, this.#enunciado, respostasEmbaralhadas, this.#acertou)
    }

    static fromObject(obj: QuestaoModel): QuestaoModel{
        const respostas = obj.respostas.map(resp => RespostaModel.fromObject(resp))
        return new QuestaoModel(obj.id, obj.enunciado, respostas, obj.acertou)
    }

    paraObjeto(){
        return{
            id: this.#id,
            enunciado: this.#enunciado,
            respostas: this.#respostas.map(resp => resp.paraObjeto()),
            respondida: this.respondida,
            acertou: this.#acertou
        }
    }
}