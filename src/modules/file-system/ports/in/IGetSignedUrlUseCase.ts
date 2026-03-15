export const GET_SIGNED_URL_USE_CASE = 'GET_SIGNED_URL_USE_CASE'

export interface IGetSignedUrlUseCase {
  execute(fileId: string): Promise<string>
}
