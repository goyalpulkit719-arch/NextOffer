import { motion } from "framer-motion";

function FeedbackCard({ title, items, icon, color }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border p-6 shadow-sm ${color}`}
    >
      <h2 className="text-xl font-bold">
        {icon} {title}
      </h2>

      <div className="mt-5 space-y-3">
        {items?.map((item) => (
          <p key={item} className="flex gap-2 text-sm leading-6">
            <span>•</span>
            <span>{item}</span>
          </p>
        ))}
      </div>
    </motion.section>
  );
}

export default FeedbackCard;