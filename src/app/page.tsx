import LabelForm from '@/components/LabelForm'
import LabelList from '@/components/LabelList'

export default function Home() {
  return (
    <main className="min-h-screen p-6 bg-orange-100">
      <div className="container mx-auto text-[#a45f1f]">
        <h1 className="text-[32px]  font-bold mb-6">Label Constructor</h1>

        <div className="flex flex-col lg:flex-row lg:gap-8">

          <div className="w-full lg:w-1/2">
            <LabelForm />
          </div>

          <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
            <LabelList />
          </div>
        </div>
      </div>
    </main>
  )
}
