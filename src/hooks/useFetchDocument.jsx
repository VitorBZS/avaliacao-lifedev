import { useState, useEffect } from "react"
import { db } from "../firebase/config"
import { doc, getDoc } from "firebase/firestore"

export const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadDocument = async () => {
      setLoading(true)
      setError(null)
      try {
        const docRef = doc(db, docCollection, id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setDocument({ id: docSnap.id, ...docSnap.data() })
        } else {
          setDocument(null)
        }
      } catch (err) {
        setError(err.message)
        setDocument(null)
      }
      setLoading(false)
    }
    loadDocument()
  }, [docCollection, id])

  return { document, loading, error }
}