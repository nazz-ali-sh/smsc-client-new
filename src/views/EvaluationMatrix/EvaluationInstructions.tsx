import React from 'react'

const EvaluationInstructions = () => {
  const steps = [
    {
      title: 'Shortlist Agents to Populate the Matrix',
      description: 'Once you shortlist agents, they will automatically appear in the evaluation matrix below.'
    },
    {
      title: 'Choose the Criteria You Want to Score Agents On',
      description:
        'You can edit the default list of criteria to reflect what matters most to your block. For example, "Responsiveness", "Service Charge Transparency", or "Reporting Tools". Once you save your list of criteria, it cannot be changed.'
    },
    {
      title: 'Understand How Weightings Work',
      description:
        'Each criterion can be weighted from 0.5 to 1.5 in 0.25 increments, allowing you to emphasize or de-emphasize its importance. For example, if "Communication" is very important, you could assign it a weight of 1.5. The weighting is automatically applied to each score you enter (e.g. a score of 8 with a 1.5 weighting will count as 12).'
    },
    {
      title: 'Scoring Each Managing Agent',
      description:
        'During your video calls and/or site visits, give each agent a score from 1 (poor) to 10 (excellent) for every criterion.'
    },
    {
      title: 'Collating Multiple Resident Views (If applicable)',
      description:
        'If multiple residents are attending the meetings, we recommend printing the blank matrix and asking each person to complete it individually. You can then calculate an average score for each criterion and enter that into the portal (only one set of scores can be submitted per tender).'
    },
    {
      title: 'Save Your Matrix',
      description:
        "Once you've completed all scores, click Save Matrix. These scores will be locked and cannot be changed, but they will appear in your Final Report once you've selected your managing agent."
    }
  ]

  return (
    <>
      <div className='font-normal space-y-8 text-xs mt-4'>
        {steps.map((step, index) => (
          <div key={index}>
            <h3 className='font-bold text-[#696969]'>
              {index + 1}. {step.title}
            </h3>
            <p className='pt-1 text-[#828282] text-[13px]'>{step.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default EvaluationInstructions
