import { Request, Response } from "express";
import UserData from "../models/userData";
import Texts, { IText, TText } from "../models/text";


export const createUserData = async (request: Request, response: Response) => {
  try {

    const userId = "test-123";

    const userData = await UserData.create(
      {
        userId: userId,
        dateCreated: new Date(),
      });

    return response.status(200).json(userData);
  } catch (error) {
    console.error("There was an error when creating user texts: ", error.message)
    return response.status(500).json({ message: "Error when creating user texts" });
  }
}

export const getUserData = async (request: Request, response: Response) => {
  try {
    const userId = "test-123";
    const userData = await UserData.findOne({ userId: userId });

    return response.status(200).json(userData);
  } catch (error) {
    console.error("There was an error when getting user texts: ", error.message);
    return response.status(500).json({ message: "Error when getting user texts" });
  }
};

export const getTextsByUserId = async (request: Request, response: Response) => {
  try {
    const userId = "test-123";
    const texts = await Texts.find({ userId: userId });

    return response.status(200).json(texts);
  } catch (error) {
    console.error("There was an error when getting texts for user: ", error.message);
    return response.status(500).json({ message: "Error when getting texts for user" });
  }
};

export const updateTextsOrder = async (request: Request, response: Response) => {
  try {
    const orderedTexts: Partial<IText>[] = [{ _id: "67f6aa6732f90494dfedcde6", order: 1 }, { _id: "67f6a14ad36a1a60b09aba99", order: 2 }]
    const userId = "test-123";

    const texts = await Texts.bulkWrite(
      orderedTexts.map(({ _id, order }) => ({
        updateOne: {
          filter: { userId: userId, _id: _id },
          update: { $set: { order } },
        }
      }))
    );

    return response.status(200).json(texts);
  } catch (error) {
    console.error("Error updating texts order:", error);
    return response.status(500).json({ message: "Error when ordering texts" });
  }
};

export const createText = async (request: Request, response: Response) => {
  try {
    const date = new Date();
    const userId = "test-123";
    const { title, content, scrollSpeed } = request.body;
    const textsCount = await Texts.countDocuments({ userId: userId });
    let nextOrderNumber = textsCount + 1;

    const newText: TText = {
      userId: userId,
      title: title,
      content: content,
      scrollSpeed: scrollSpeed,
      dateCreated: date,
      order: nextOrderNumber
    }

    const createdText = await Texts.create(newText)

    return response.status(201).json(createdText);
  } catch (error) {
    console.error("There was an error when creating a new text: ", error.message)
    return response.status(500).json({ message: "Error when creating a new text" })
  }
};

export const deleteText = async (request: Request, response: Response) => {
  try {
    const userId = "test-123";
    const { id } = request.params
    await Texts.deleteOne({
      userId: userId,
      _id: id
    })

    return response.status(200).json();
  }
  catch (error) {
    console.error("There was an error when deleting a text: ", error.message)
    return response.status(500).json({ message: "Error when deleting a text" })
  }
}

export const getTextById = async (request: Request, response: Response) => {
  try {
    const userId = "test-123";
    const { id } = request.params
    const text = await Texts.findById(
      { userId: userId, _id: id },
    );
  
    return response.status(200).json(text);
  } catch (error) {
    console.error("There was an error when getting a text: ", error.message)
    return response.status(500).json({ message: "Error when getting a text" })
  }
};

export const updateText = async (request: Request, response: Response) => {
  try {
    const date = new Date();
    const userId = "test-123";
    const { id } = request.params
    const { title, content, scrollSpeed } = request.body;
    const text = await Texts.updateOne(
      {
        userId: userId,
        _id: id
      },
      {
        $set: {
          dateModified: date,
          title: title,
          content: content,
          scrollSpeed: scrollSpeed,
        }
      }
    );

    return response.status(201).json(text);
  } catch (error) {
    console.error("There was an error when updating a text: ", error.message)
    return response.status(500).json({ message: "Error when updating a text" })
  }
}
