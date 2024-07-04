import { type SmartAgentJob } from 'wasp/server/jobs'
import { type JobAd, type SearchProfile } from 'wasp/entities'
import { getFilteredJobAds, type JobAdFilters, getFilteredSearchProfiles } from '../queries';
import { SendEmailOptions, sendEmail} from '../actions';
import { type Interval } from '../config';

type emailDigestInput = {
    interval: Interval
}
export const emailDigest: SmartAgentJob<emailDigestInput, any> = async (
    args: emailDigestInput,
    context: any) => {
        const searchProfiles: SearchProfile[] = await getFilteredSearchProfiles({ interval: args.interval }, context)
        if (searchProfiles.length === 0) {
            console.log('No search profiles to send email to');
            return;
        }

        searchProfiles.forEach(async (searchProfile: SearchProfile) => {
            const { minPrice, maxPrice, isDone, category, emails } = searchProfile;
            const jobAdFilters: JobAdFilters = { minPrice, maxPrice, isDone, category }; 
            const jobAds: JobAd[] = await getFilteredJobAds(jobAdFilters, context);
            if (jobAds.length === 0) {
                console.log('No job ads can be found with given search profile');
            } else if (emails.length === 0) {
                console.log('No emails can be found with given search profile');
            } else {
                // Send email
                emails.forEach(async (email: string) => {
                    const sendEmailOptions: SendEmailOptions = { jobAds, email };
                    console.log('Sending email to:', email, 'with number of job ads:', jobAds.length);
                    const info = await sendEmail(sendEmailOptions, context);
                });
            }
          });  
}