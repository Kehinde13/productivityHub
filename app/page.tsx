import Link from 'next/link';

export default function Home() {

  const features = [
    { href: 'pages/pomodoro', title: 'Pomodoro Timer', emoji:"⏱️" },
    { href: 'pages/meditation', title: 'Meditation', emoji:"🧘" },
    { href: 'pages/notes', title: 'Notes',  emoji:"📝"},
    { href: 'pages/todo', title: 'Todo List',emoji:"✅"  },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8 flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-extrabold text-blue-800 mb-6">Welcome to Productivity Hub</h1>
      <p className="text-gray-600 mb-10 max-w-xl">
        Boost your focus and mindfulness with our productivity tools.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        {
          features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))
        }
      </div>
    </div>
  );
}

function FeatureCard({
  href,
  title,
  emoji,
}: {
  href: string;
  title: string;
  emoji: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white shadow-md rounded-xl p-6 transform transition-transform hover:scale-105 hover:shadow-xl duration-300 flex flex-col items-center"
    >
      <div className="text-5xl mb-4">
        {emoji}
      </div>
      <h2 className="text-xl font-semibold text-blue-700">{title}</h2>
    </Link>
  );
}
