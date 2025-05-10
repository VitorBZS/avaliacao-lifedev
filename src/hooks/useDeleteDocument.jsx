import { useState, useEffect } from "react"
import { db } from "../firebase/config"
import { doc, deleteDoc } from "firebase/firestore"

export const useDeleteDocument = (docCollection) => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const deleteDocument = async (id) => {
    setLoading(true)
    setError(null)

    try {
      const docRef = doc(db, docCollection, id)
      await deleteDoc(docRef)
      setLoading(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return { deleteDocument, error, loading }
}