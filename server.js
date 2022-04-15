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
    name: "Test",
    description: "Test description",
  },
];

function sendCard(card) {
  return trelloClient.addCard(
    card.name,
    card.description,
    ID_LIST,
    (error, trelloCard) => {
      if (error) {
        console.log(`Could not add card: ${card.name}`, error);
      } else {
        console.log(`Card ${card.name} add with success!`);
      }
    }
  );
}

function sendCards(cards) {
  try {
    cards.map((c) => {
      sendCard(c);
    });
  } catch (error) {
    console.error("An error as ocurred" + error);
  }
}

sendCards(cards);
