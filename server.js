import trello from "trello";
import dotenv from "dotenv";

if (process.env.NODE_ENV === "production") {
  dotenv.config("./.env");
} else {
  dotenv.config({ path: "./.env.development" });
}

const ID_LIST = process.env.ID_LIST;

const trelloClient = new trello(process.env.API_KEY, process.env.API_TOKEN);

const cards = [
  {
    name: "EU 00121 - Tela de exibição dos serviços do usuário.",
    description:
      "Cenário: Usuario clicou na botão de avançar.\nEntrada: Avançar\nResultado Esperado: Ir para uma proxima pagina\nObservações: ",
    comments: ["Hehe"],
  },
];

function addCardToList(card) {
  trelloClient.addCard(
    card.name,
    card.description,
    ID_LIST,
    (error, trelloCard) => {
      if (error) {
        console.log(`Could not add card: ${card.name}`, error);
      } else {
        card.comments.map((c) => {
          trelloClient.addCommentToCard(trelloCard.id, c);
        });
      }
    }
  );
}

function sendCards(cards) {
  try {
    cards.map((c) => {
      addCardToList(c);
    });
  } catch (error) {
    console.error("An error as ocurred" + error);
  }
}

sendCards(cards);
