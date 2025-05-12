const Policy = () => {
  return (
    <div className='bg-white w-full flex items-center justify-center flex-col'>
        <div className='w-[70%] gap-4'>
        <h1 className='text-3xl font-serif mb-10'>Car Rental Damage Policy</h1>
        <ol className='flex flex-col gap-4'>
            <li><span className='font-bold text-blue-500 border-b-2 border-blue-500 text-lg'>Responsibility for Damages :- </span>The renter is fully responsible for any damage to the vehicle during the rental period, regardless of fault, unless caused by a proven mechanical failure or manufacturing defect.</li>
            <li><span className='font-bold text-blue-500 border-b-2 border-blue-500 text-lg'>Minor Damage :- </span>If the vehicle sustains minor damage scratches, dents, broken lights, interior damage, etc.the renter must pay the full cost of repairs as assessed by an authorized service provider or the rental company.</li>
            <li><span className='font-bold text-blue-500 border-b-2 border-blue-500 text-lg'>Major Damage or Vandalism :- </span>In cases where the vehicle is severely damaged, totaled, or vandalized beyond reasonable repair, the renter agrees to pay the full market value of the vehicle as determined at the time of the incident.</li>
            <li><span className='font-bold text-blue-500 border-b-2 border-blue-500 text-lg'>Insurance Coverage (If applicable) :- </span>If the renter has provided valid insurance details, any claims will first be processed through their insurer. However, the renter is liable for any uncovered or denied amounts.</li>
            <li><span className='font-bold text-blue-500 border-b-2 border-blue-500 text-lg'>Security Deposit :- </span>The rental company reserves the right to withhold part or all of the security deposit to cover damage costs.</li>
            <li><span className='font-bold text-blue-500 border-b-2  border-blue-500 text-lg'>Reporting :- </span>Any damage, theft, or incident must be reported to the rental company immediately, along with a police report (if applicable). Failure to report damage may result in additional charges or legal action.</li>
            <li><span className='font-bold text-blue-500 border-b-2 border-blue-500 text-lg'>Exceptions :- </span>This policy does not cover damage resulting from natural disasters (unless stated in the contract) or mechanical failure not caused by the renter.

            </li>
        </ol>
        </div>
    </div>
  )
}

export default Policy