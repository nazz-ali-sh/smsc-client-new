export const formatWebsiteUrl = (website?: string): string => {
  if (!website) return '#'

  let url = website.trim()

  url = url.replace(/^(https?:\/\/)?(www\.)?/i, '')

  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url
  }

  return url
}
