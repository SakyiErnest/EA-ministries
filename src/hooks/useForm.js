import { useCallback, useState } from 'react'

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues)

  const handleChange = useCallback((e) => {
    const { name, type } = e.target
    const value = type === 'checkbox' ? e.target.checked : e.target.value

    setValues((prev) => ({
      ...prev,
      [name]: value
    }))
  }, [])

  const resetForm = useCallback(() => {
    setValues(initialValues)
  }, [initialValues])

  return { values, setValues, handleChange, resetForm }
}
