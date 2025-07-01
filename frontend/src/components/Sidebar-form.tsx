import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Trash2, Send } from 'lucide-react'


const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  level: z.enum(["Beginner", "Intermediate", "Advanced"], {
    required_error: "Please select a skill level"
  })
})

const profileSchema = z.object({
  goal: z.string().min(1, "Goal is required"),
  skill: z.array(skillSchema).min(1, "At least one skill is required"),
  experience: z.string().min(1, "Experience is required"),
  duration_month: z.number().min(1, "Duration must be at least 1 month"),
  weekly_hours: z.number().min(1, "Weekly hours must be at least 1 hour"),
  learning_style: z.string().min(1, "Learning style is required")
})

type ProfileFormData = z.infer<typeof profileSchema>


function Sidebarform({submiting,isSubmiting}:{submiting:Boolean,isSubmiting:Function}) {
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      goal: '',
      skill: [{ name: '', level: 'Beginner' }],
      experience: '',
      duration_month: 1,
      weekly_hours: 1,
      learning_style: ''
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skill"
  })

  const onSubmit = async (data: ProfileFormData) => {
    isSubmiting(true)
    setSubmitMessage(null)

    console.log(data);
    
  
    try {
      const response = await fetch('http://127.0.0.1:8000/create-learning-profile', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

       console.log(response)

      if (response.ok) {
        setSubmitMessage({ type: 'success', text: 'Profile submitted successfully!' })
        reset()
      } else {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitMessage({ type: 'error', text: 'Failed to submit profile. Please try again.' })
    } finally {
      isSubmiting(false)
    }
  }

  const addSkill = () => {
    append({ name: '', level: 'Beginner' })
  }

  const removeSkill = (index: number) => {
    if (fields.length > 1) {
      remove(index)
    }
  }

  return (
    <div className='w-full min-h-screen bg-[#170730] p-6'>
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Learning Profile</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Goal Field */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Goal *
            </label>
            <textarea
              {...register('goal')}
              className="w-full px-3 py-2 bg-white/10 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Become a Senior AI Engineer"
              rows={3}
            />
            {errors.goal && (
              <p className="mt-1 text-sm text-red-400">{errors.goal.message}</p>
            )}
          </div>

          {/* Skills Section */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Skills *
            </label>
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-start">
                  <div className="flex-1">
                    <input
                      {...register(`skill.${index}.name`)}
                      className="w-full px-3 py-2 bg-white/10 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none  focus:ring-blue-500 focus:border-transparent"
                      placeholder="Skill name"
                    />
                    {errors.skill?.[index]?.name && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.skill[index]?.name?.message}
                      </p>
                    )}
                  </div>
                  <div className="w-32">
                    <select
                      {...register(`skill.${index}.level`)}
                      className="w-full px-3 py-2 bg-white/10 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                    {errors.skill?.[index]?.level && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.skill[index]?.level?.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    disabled={fields.length === 1}
                    className="p-2 text-red-400 hover:text-red-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addSkill}
              className="mt-3 flex items-center gap-2 bg-white/10 rounded-full  px-3 py-2 text-sm text-slate-100 hover:text-purple-300 focus:outline-none"
            >
              <Plus size={16} />
              Add Skill
            </button>
            {errors.skill && (
              <p className="mt-1 text-sm text-red-400">{errors.skill.message}</p>
            )}
          </div>

          {/* Experience Field */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Experience *
            </label>
            <textarea
              {...register('experience')}
              className="w-full px-3 py-2 bg-white/10 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 5 years in software development"
              rows={3}
            />
            {errors.experience && (
              <p className="mt-1 text-sm text-red-400">{errors.experience.message}</p>
            )}
          </div>

          {/* Duration Field */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Duration (months) *
            </label>
            <input
              type="number"
              {...register('duration_month', { valueAsNumber: true })}
              min="1"
              className="w-full px-3 py-2 bg-white/10 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="3"
            />
            {errors.duration_month && (
              <p className="mt-1 text-sm text-red-400">{errors.duration_month.message}</p>
            )}
          </div>

          {/* Weekly Hours Field */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Weekly Hours *
            </label>
            <input
              type="number"
              {...register('weekly_hours', { valueAsNumber: true })}
              min="1"
              className="w-full px-3 py-2 bg-white/10 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="20"
            />
            {errors.weekly_hours && (
              <p className="mt-1 text-sm text-red-400">{errors.weekly_hours.message}</p>
            )}
          </div>

          {/* Learning Style Field */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Learning Style *
            </label>
            <textarea
              {...register('learning_style')}
              className="w-full px-3 py-2 bg-white/10 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Hands-on projects and self-study"
              rows={3}
            />
            {errors.learning_style && (
              <p className="mt-1 text-sm text-red-400">{errors.learning_style.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-900 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#062139] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submiting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send size={16} />
                Submit Profile
              </>
            )}
          </button>

          {/* Success/Error Message */}
          {submitMessage && (
            <div className={`p-3 rounded-md ${
              submitMessage.type === 'success' 
                ? 'bg-green-900/50 text-green-300 border border-green-700' 
                : 'bg-red-900/50 text-red-300 border border-red-700'
            }`}>
              {submitMessage.text}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default Sidebarform