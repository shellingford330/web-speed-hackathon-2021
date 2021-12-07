function formatDate(createdAt) {
  const date = new Date(createdAt)
  return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`
}

export { formatDate };