import HomeButtonAppBar from '@/components/HomeButtonAppBar'
import FormPage from '@/containers/form'

export default function GroupFormPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      <HomeButtonAppBar />
      <div className="flex flex-col items-center justify-start w-full px-5 py-10 min-h-screen bg-white">
        <FormPage />
      </div>
    </div>
  )
}
