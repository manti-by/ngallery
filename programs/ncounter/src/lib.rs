use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod nvalidator {
    use super::*;

    pub fn create_account(_ctx: Context<CreateContext>) -> ProgramResult {
        Ok(())
    }

    pub fn update_account(_ctx: Context<UpdateContext>) -> ProgramResult {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateContext<'info> {
    #[account(init, payer = user, space = 10000)]
    pub base_account: Account<'info, BaseAccount>,

    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateContext<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}

#[account]
pub struct BaseAccount {
    pub total_images: u64,
}
