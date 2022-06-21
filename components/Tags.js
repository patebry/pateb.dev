import capitalize from '../utils/capitalize'

const Tag = ({ tag }) => {
  return (
    <a
      className="bg-primary text-base p-1 px-4 mr-2 text-white cursor-pointer rounded-3xl border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 mb-2"
      href={`/tags/${tag}`}
    >
      <strong>{capitalize(tag)}</strong>
    </a>
  )
}

const Tags = ({ tags }) => {
  return (
    <div className="flex items-center mb-4 flex-wrap">
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </div>
  )
}

export default Tags
