import LabelForm from '@/components/LabelForm'
import LabelList from '@/components/LabelList'

export default function Home() {
  return (
    <main className="min-h-screen p-6 bg-orange-100">
      <LabelForm />
      <LabelList />
    </main>
  )
}
