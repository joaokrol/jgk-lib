import firebase_admin
from firebase_admin import credentials, firestore
import json
from datetime import datetime

def getFirebaseConnect():
    if not firebase_admin._apps:
        cred = credentials.Certificate("key.json")
        firebase_admin.initialize_app(cred)
    return firestore.client()

def getJsonData(path):
    try:
        with open(path, 'r', encoding="utf-8") as file:
            return json.load(file)
    except Exception as e:
        print(e)
        return False

def saveToFirebase(db, collection,  data):
    try:
        if isinstance(data, str):
            save_data = json.loads(data)
        else:
            save_data = data

        document_id = save_data['key']
        doc_ref = db.collection(collection).document(document_id)
        doc_ref.set(save_data)
        print(f"Sucesso! Documento '{document_id}' salvo na coleção '{collection}'.")
        return True
    except Exception as e:
        print(f"Erro ao salvar no Firebase: {e}")
        return False


def saveInData(db, data): 
    collection_ref = db.collection('sheets').document('regqua004').collection('data')
    batch = db.batch()
    contador = 0
    for item in data:
        doc_ref = collection_ref.document()
        batch.set(doc_ref, item)
        contador += 1
        if contador == 499:
            batch.commit()
            batch = db.batch() # Reinicia o lote
            contador = 0
    if contador > 0:
        batch.commit()
        print(f"Sucesso! Todos os itens foram salvos em 'sheets/regqua004/data'.")

def main():
    db = getFirebaseConnect()
    # data = getJsonData(r"C:\Git\JGK\jgk-lib\scripts\schemas\definitions\regqua004.def.json")
    # if (data):
        # saveToFirebase(db, 'sheets', data)

    data_data = getJsonData(r"C:\Git\JGK\jgk-lib\scripts\schemas\example_data\regqua004.example.json")
    data_data['data'] = datetime.strptime(data_data['data'], "%d/%m/%Y")
    save_data = []

    for _ in range(10):
        save_data.append(data_data)

    if(save_data):
        saveInData(db, save_data)

if __name__ == '__main__':
    main()